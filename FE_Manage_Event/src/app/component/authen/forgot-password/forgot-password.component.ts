import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authen/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  mailSent: boolean;
  isProgressVisible: boolean;
  forgotPasswordForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(private authService: AuthService, private router: Router,public toastr: ToastrService,
     private afAuth: AngularFireAuth) {
      this.mailSent = false;
      this.isProgressVisible = false;

      this.forgotPasswordForm = new FormGroup({
          'email': new FormControl('', [Validators.required, Validators.email])
      });

      this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
      this.afAuth.authState.subscribe(user => {               // if the user is logged in, update the form value with their email address
          if (user) {
              this.forgotPasswordForm.patchValue({
                  email: user.email
              });
          }
      });
  }

  retrievePassword() {
      this.isProgressVisible = true;

      if (this.forgotPasswordForm.invalid)
          return;

      this.authService.resetPassword(this.forgotPasswordForm.value.email).then((result) => {
          this.isProgressVisible = false;
          if (result == null) {
              console.log('password reset email sent...');
              this.mailSent = true;
              this.toastr.success("Sent email for change password. Please check your email !!!")
              this.router.navigate(['/login']);
          }
          else if (result.isValid == false) {
              console.log('login error', result);
              this.firebaseErrorMessage = result.message;
          }
      });
  }

}
