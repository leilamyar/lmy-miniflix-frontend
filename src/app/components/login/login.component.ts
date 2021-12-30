import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any = FormGroup;
  msg = '';
  user?: User;
  fromForm?: any;

  // private users: any[] = [];

  constructor(private fb: FormBuilder, private router: Router, private authSv: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      // email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    // Extract values from the form:
    // this.loginForm.valueChanges.subscribe(console.log);
  };

  private handleNext = (data: any) => {
    this.user = data[0];
    if (this.user) {
      if (this.user.password === this.fromForm.password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', this.user.username);
        localStorage.setItem('userId', String(this.user.id));

        localStorage.setItem('list', this.user.herList.join(','));
        // TODO: replace ls list (ie, user) by Store

        this.router.navigate(['browse']);
      } else {
        this.msg = 'The password is not correct';
      }
    } else {
      this.msg = `The username "${this.fromForm.username}" doesn't exist`;
    }
    return data[0];
  };

  private handleError(err: string) {
    this.msg = 'An error occured. Please try again later.';
    console.log(err);
    return err;
  };

  observer: Observer<User> = {
    next: this.handleNext,
    error: this.handleError,
    complete: () => { console.log('Log In Request Completed'); },
  }


  submitLogin(inputData: any) {
    this.fromForm = inputData;
    if (inputData.username) {
      this.authSv.getUser(inputData.username)
        .subscribe(this.observer);
      // TODO: put user in Store
    } else {
      this.msg = `Please enter a username`;
    }
  };
}
