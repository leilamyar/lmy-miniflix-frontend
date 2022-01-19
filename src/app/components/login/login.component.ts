import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observer, Subscription, tap } from 'rxjs';
import { AppState } from 'src/app/models/AppState';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: any = FormGroup;
  msg = '';
  fromForm?: any;
  subscription?: Subscription;
  loginSubsc?: Subscription;

  constructor(private fb: FormBuilder, private router: Router, private dataSv: DataService, private userSv: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      // email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    // Extract values from the form:
    // this.loginForm.valueChanges.subscribe(console.log);
  };

  submitLogin(inputData: any) {
    // this.fromForm = inputData;
    if (inputData.username) {
      this.loginSubsc = this.dataSv.login(inputData);
      this.subscription = this.dataSv
        .onLoggedInUpdate()
        .subscribe(() => this.router.navigate(['browse']));
    } else {
      this.msg = `Please enter a username`;
    }
  };

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.loginSubsc?.unsubscribe();
    // // TODO: check unsubscribe to list of Subscriptions all at once
    // console.log('[LoginComp] Destroyed');
  }
}
