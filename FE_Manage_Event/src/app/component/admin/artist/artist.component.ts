import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Artist } from 'src/app/models/admin/artist.model';
import { ArtistService } from 'src/app/services/admin/artist.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artists : Artist[] = [];
  firstName: any;
  lastName: any;
  page: number = 1;
  public artistForm?: FormGroup;
  selected = '-1';
  hideWhenNoStudent: boolean = false;
  noData: boolean = false;

  constructor(private artistService: ArtistService,public fb: FormBuilder,
    public toastr: ToastrService) { }

  ngOnInit(): void {

    this.artistForms();

    this.dataState();
    let s = this.artistService.GetArtistList();
    s.snapshotChanges().subscribe(data => {
      this.artists = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        // a['$key'] = item.key;
        this.artists.push(a as Artist);
      })
    })
  }

  dataState() {
    this.artistService.GetArtistList().valueChanges().subscribe(data => {

      if(data.length <= 0){
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    })
  }

  artistForms() {
    this.artistForm = this.fb.group({
      firstName: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
      lastName: new FormControl(''),
      email: new FormControl(['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]]),
      phone: new FormControl(['', [Validators.required, Validators.pattern('^[0-9]+$')]]),
      gender: new FormControl(''),
      birthday: new FormControl('',[Validators.required, Validators.pattern('^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g')]),
      salary: new FormControl(['', [Validators.required, Validators.pattern('^[0-9]+$')]]),
      photoURL: new FormControl(''),
    })
  }
  // submitStudentData() {
  //   this.artistService.AddArtist(this.artistForm.value);
  //   this.toastr.success(this.artistForm.controls['firstName'].value + ' successfully added!');
  //   this.ResetForm();
  //  };

  //  ResetForm() {
  //   this.artistForm.reset();
  // }


  search(){
    if(this.firstName == ""){
      this.ngOnInit();
    }
    else{
      this.artists = this.artists.filter(res =>{
        return res.firstName?.toLowerCase().match(this.firstName);
      });
    }
  }

  key: string = 'id';
  reverse: boolean = false;
  sort(key:string){
    this.key = key;
    this.reverse =!this.reverse;
  }



}
