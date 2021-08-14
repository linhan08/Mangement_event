import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authen/auth.service';
import { TokenStorageService } from 'src/app/services/authen/token-storage.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  roles: string[] = [];
  isLoggedIn = false;
  showAdmin = false;
  showModerator = false;
  showUser = false;
  username?: string;

  userStatus = this.firebaseService.userStatus;

  constructor(private tokenStorageService: TokenStorageService,private router : Router,private firebaseService: AuthService,
    public afAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdmin= this.roles.includes('ROLE_ADMIN');
      this.showModerator = this.roles.includes('ROLE_MODERATOR');
      this.showUser = this.roles.includes('ROLE_USER');

      this.username = user.username;

      this.firebaseService.userChanges();

      this.firebaseService.userStatusChanges.subscribe(x => this.userStatus = x);
      console.log(this.userStatus);
    }
  }

  logout(): void {
    this.firebaseService.logOut();
  }

}
