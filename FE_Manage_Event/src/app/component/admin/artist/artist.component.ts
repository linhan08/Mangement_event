import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/admin/artist.model';
import { ArtistService } from 'src/app/services/admin/artist.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artists : Artist[] = [];
  name: any;
  page: number = 1;
  constructor(private artistService: ArtistService) { }

  ngOnInit(): void {
    this.artistService.getArtist().subscribe(response =>{
      this.artists = response;
    })
  }
  search(){
    if(this.name == ""){
      this.ngOnInit();
    }
    else{
      this.artists = this.artists.filter(res =>{
        return res.name?.toLowerCase().match(this.name);
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
