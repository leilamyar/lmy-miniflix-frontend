import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any = FormGroup;
  private users: any[] = [];

  constructor(private fb: FormBuilder, private router: Router, private authSv: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      // email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    // Extract values from the form:
    // this.loginForm.valueChanges.subscribe(console.log);
    this.authSv.getUser()
      .subscribe((data) => {
        this.users = data;
      });
  };

  submitLogin(inputData: any) {
    // console.log('inputData from Form::', inputData);
    if (inputData.username) {
      let fromDb = this.users.find(u => u.username === inputData.username);
      if (fromDb.password === inputData.password) {
        // console.log('User is valid');
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['films']);
      } else {
        console.log('User is not valid');
      }
    } else {
      console.log('Please enter valid username & password');

    }
  };

  navigateToSignUp() {
    this.router.navigate(['register']);
  };
}
