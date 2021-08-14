import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, } from 'rxjs';
import { Artist } from 'src/app/models/admin/artist.model';
import {} from 'rxjs/Operators';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private dbPath = '/Users/';

  artistList: AngularFireList<Artist>;

  artistRef!: AngularFireObject<Artist>;

  constructor(private db: AngularFireDatabase) {
    this.artistList = db.list(this.dbPath);
  }

  AddArtist(artist: Artist) {
    this.artistList.push({
        id: artist.id,
        firstName: artist.firstName,
        lastName: artist.lastName,
        email: artist.email,
        phone: artist.phone,
        gender:  artist.gender,
        birthday:  artist.birthday,
        salary: artist.salary,
        photoURL: artist.photoURL,
    })
  }
  // Fetch Single Artist Object
  GetArtistById(id: string) {
    this.artistRef = this.db.object(this.dbPath + id);
    return this.artistRef;
  }
  // Fetch Artist List
  GetArtistList() {
    this.artistList = this.db.list(this.dbPath);
    return this.artistList;
  }
  // Update Artist Object
  UpdateArtist(artist: Artist) {
    this.artistRef.update({
        firstName: artist.firstName,
        lastName: artist.lastName,
        email: artist.email,
        phone: artist.phone,
        gender:  artist.gender,
        birthday:  artist.birthday,
        salary: artist.salary,
        photoURL: artist.photoURL
    })
  }
  // Delete artist Object
  DeleteArtist(id: string) {
    this.artistRef = this.db.object(this.dbPath + id);
    this.artistRef.remove();
  }
}


