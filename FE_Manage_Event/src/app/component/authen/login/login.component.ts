import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/authen/auth.service';
import { TokenStorageService } from 'src/app/services/authen/token-storage.service';
import { UserService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: User = new User();
    submitted = false;
    public userForm!: FormGroup;

    constructor(private authService: AuthService, private userService: UserService,
      public formBuilder: FormBuilder,
      public toastr: ToastrService,
      private router: Router, private afAuth: AngularFireAuth) {
    }

    ngOnInit(): void {
        this.userService.GetUserList();
        this.userForms();
    }

    userForms() {
      this.userForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      });
    }

    ResetForm() {
      this.userForm.reset();
    }

    login(formData: any){
      this.authService.login(formData["email"], formData["password"])
      this.toastr.success('successfully Login !!!');
      this.router.navigate(["/admin/dashboard"]);
      this.ResetForm();
    }

}
