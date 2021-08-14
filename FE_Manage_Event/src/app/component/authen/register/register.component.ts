import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/authen/auth.service';
import { UserService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // isProgressVisible: boolean;
  // signupForm!: FormGroup;
  // firebaseErrorMessage: string;
  user: User = new User();
  submitted = false;
  public userForm!: FormGroup;

  constructor(private authService: AuthService, private userService: UserService,
    public formBuilder: FormBuilder,
    public toastr: ToastrService,
    private router: Router, private afAuth: AngularFireAuth) {
      // this.isProgressVisible = false;
      // this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
      // if (this.authService.userLoggedIn) {
      //     this.router.navigate(['/dashboard']);
      // }

      // this.signupForm = new FormGroup({
      //     'displayName': new FormControl('', Validators.required),
      //     'email': new FormControl('', [Validators.required, Validators.email]),
      //     'password': new FormControl('', Validators.required)
      // });
      this.userService.GetUserList();
      this.signupForm();
  }
  signupForm() {
    this.userForm = new FormGroup({
      // userName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      // photoURL: new FormControl(),
    });
  }

  ResetForm() {
    this.userForm.reset();
  }

  // submitData() {
  //   this.userService.AddUser(this.userForm.value);
  //   this.toastr.success(this.userForm.controls['userName'].value + ' successfully added !!!');
  //   this.router.navigate(['/login']);
  //   this.ResetForm();
  // };



  signup(formData: any) {
    this.authService.signUp(formData["email"], formData["password"])
    this.toastr.success(' successfully Regiester !!!');
    this.router.navigate(['/login']);

      // if (this.signupForm.invalid)
      //     return;

      // this.isProgressVisible = true;
      // this.authService.signupUser(this.signupForm.value).then((result) => {
      //     if (result == null)
      //         this.router.navigate(['/login']);
      //     else if (result.isValid == false)
      //         this.firebaseErrorMessage = result.message;

      //     this.isProgressVisible = false;
      // }).catch(() => {
      //     this.isProgressVisible = false;
      // });
  }
}
