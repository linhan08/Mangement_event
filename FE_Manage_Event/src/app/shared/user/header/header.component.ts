import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authen/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private firebaseService: AuthService, private router: Router){}

  userStatus = this.firebaseService.userStatus;

  logout(){
    this.firebaseService.logOut();
    this.router.navigate(["/home"])
  }


  ngOnInit(){
  
  }

}
