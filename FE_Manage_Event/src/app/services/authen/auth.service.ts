import { Injectable, NgZone } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class AuthService {


  public currentUser: any;
  public userStatus!: string;
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);

  constructor(private router: Router, private afAuth: AngularFireAuth,private ngZone: NgZone,
    private firestore: AngularFirestore) {

  }

  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
  }

  signUp(email:string, password:string){


    this.afAuth.createUserWithEmailAndPassword(email, password)
     .then((userResponse:any) => {
       // add the user to the "users" database
       let user = {
        id: userResponse.user.uid,
        username: userResponse.user.email,
        role: "user",
       }

       //add the user to the database
       this.firestore.collection("users").add(user)
       .then(user => {
        user.get().then(x => {
          //return the user data
          console.log(x.data());
          this.currentUser = x.data();
          this.setUserStatus(this.currentUser);
          this.router.navigate(["/login"]);
        })
       }).catch(err => {
         console.log(err);
       })


     })
     .catch((err)=>{
        console.log("An error ocurred: ", err);
     })

    }

    login(email: string, password: string) {
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then((user:any)=>{
        this.firestore.collection("users").ref.where("username", "==", user.user.email).onSnapshot(snap =>{
          snap.forEach((userRef:any) => {
            console.log("userRef", userRef.data());
            this.currentUser = userRef.data();
            this.setUserStatus(this.currentUser)

          })
        })
      }).catch(err => err)
    }

  logOut(){
    this.afAuth.signOut()
    .then(()=>{
      console.log("user signed Out successfully");
      //set current user to null to be logged out
      this.currentUser = null;
      //set the listenener to be null, for the UI to react
      this.setUserStatus(null);
      this.ngZone.run(() => this.router.navigate(["/home"]));

    }).catch((err) => {
      console.log(err);
    })
  }


  userChanges(){
    this.afAuth.onAuthStateChanged(currentUser => {
      if(currentUser){
        this.firestore.collection("users").ref.where("username", "==", currentUser.email).onSnapshot(snap =>{
          snap.forEach((userRef:any) => {
            this.currentUser = userRef.data();
            //setUserStatus
            this.setUserStatus(this.currentUser);
            console.log(this.userStatus)

            if(userRef.data().role !== "admin") {
             this.ngZone.run(() => this.router.navigate(["/user-home"]));
            }else{
             this.ngZone.run(() => this.router.navigate(["/admin/dashboard"]));
            }
          })
        })
      }else{
        //this is the error you where looking at the video that I wasn't able to fix
        //the function is running on refresh so its checking if the user is logged in or not
        //hence the redirect to the login
        this.ngZone.run(() => this.router.navigate(["/login"]));
      }
    })
  }

  resetPassword(email: string): Promise<any> {
      return this.afAuth.sendPasswordResetEmail(email)
          .then(() => {
              console.log('Auth Service: reset password success');
              // this.router.navigate(['/amount']);
          })
          .catch(error => {
              console.log('Auth Service: reset password error...');
              console.log(error.code);
              console.log(error)
              if (error.code)
                  return error;
          });
  }


}

