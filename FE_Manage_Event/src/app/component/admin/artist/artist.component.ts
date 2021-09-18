import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Artist } from 'src/app/models/admin/artist.model';
import { ArtistService } from 'src/app/services/admin/artist.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
  styles: [`
        :host ::ng-deep .p-dialog .artist-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
  providers: [MessageService,ConfirmationService]
})
export class ArtistComponent implements OnInit {

  firstName: any;
  lastName: any;
  page: number = 1;
  public artistForm?: FormGroup;

  hideWhenNoStudent: boolean = false;
  noData: boolean = false;

    loading: boolean = true;

    artistDialog?: boolean;

    artists: Artist[] = [];

    artist!: Artist;

    selectedArtists!: Artist[];

    submitted?: boolean;

    statuses?: any[];

  constructor(private artistService: ArtistService,
    public fb: FormBuilder, public toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {}

  ngOnInit(): void {

    this.artistForms();

    this.dataState();
    let s = this.artistService.GetArtistList();
    s.snapshotChanges().subscribe(data => {
      this.artists = [];
      this.loading = false;
      data.forEach(item => {
        let a = item.payload.toJSON();
        // a['$key'] = item.key;
        this.artists.push(a as Artist);
      })
    })
  }
  openNew() {
    this.artist = {};
    this.submitted = false;
    this.artistDialog = true;
  }
  deleteSelectedArtists() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected artists?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.artists = this.artists.filter(val => !this.selectedArtists.includes(val));
            // this.selectedArtists = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Artist Deleted', life: 3000});
        }
    });
}

editArtist(artist: Artist) {
    this.artist = {...artist};
    this.artistDialog = true;
}

deleteArtist(artist: Artist) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + artist.firstName + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.artists = this.artists.filter(val => val.id !== artist.id);
            this.artist = {};
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Artist Deleted', life: 3000});
        }
    });
}

hideDialog() {
    this.artistDialog = false;
    this.submitted = false;
}

saveArtist() {
    this.submitted = true;

    if (this.artist.firstName?.trim()) {
        if (this.artist.id) {
            this.artists[this.findIndexById(this.artist.id)] = this.artist;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Artist Updated', life: 3000});
        }
        else {
            this.artist.id = this.createId();
            this.artist.photoURL = 'artist-placeholder.svg';
            this.artists.push(this.artist);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Artist Created', life: 3000});
        }

        this.artists = [...this.artists];
        this.artistDialog = false;
        this.artist = {};
    }
}

findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.artists.length; i++) {
        if (this.artists[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
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
