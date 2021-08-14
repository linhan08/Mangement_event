import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users';

  userList: AngularFireList<User>;

  userRef!: AngularFireObject<User>;

  constructor(private db: AngularFireDatabase) {
    this.userList = db.list(this.dbPath);
  }

  AddUser(user: User) {
    this.userList.push({
      userName: user.userName,
      email: user.email,
      password: user.password,
      photoURL: user.photoURL
    })
  }
  // Fetch Single user Object
  GetUserById(id: string) {
    this.userRef = this.db.object('user-list/' + id);
    return this.userRef;
  }
  // Fetch user List
  GetUserList() {
    this.userList = this.db.list('user-list');
    return this.userList;
  }
  // Update user Object
  UpdateStudent(user: User) {
    this.userRef.update({
      userName: user.userName,
      email: user.email,
      password: user.password,
      photoURL: user.photoURL
    })
  }
  // Delete user Object
  DeleteStudent(id: string) {
    this.userRef = this.db.object('user-list/'+id);
    this.userRef.remove();
  }
}


