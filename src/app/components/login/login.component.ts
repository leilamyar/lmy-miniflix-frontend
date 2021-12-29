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
  msg = '';

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
    // TODO: put users list in Store for single src of truth betw Login & Reg Comp
  };

  submitLogin(inputData: any) {
    if (inputData.username) {
      let fromDb = this.users.find(u => u.username === inputData.username);
      if (!fromDb) {
        this.msg = `The username "${inputData.username}" doesn't exist`;
      } else {
        if (fromDb.password === inputData.password) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', inputData.username);
          this.router.navigate(['browse']);
        } else {
          this.msg = 'The password is not correct';
        }
      }
    } else {
      this.msg = `Please enter a username`;
    }
  };
}
