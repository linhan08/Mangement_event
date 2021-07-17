import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Artist } from 'src/app/models/admin/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  basedURL: string = "http://localhost:3000/Artists";

  constructor(private http: HttpClient) { }

  getArtist(){
      return this.http.get<Artist[]>(this.basedURL);
  }

}
