import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: any = FormGroup;
  // newUserId: number;

  constructor(private fb: FormBuilder, private router: Router, private authSv: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      // email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    // Extract values from the form:
    // this.registerForm.valueChanges.subscribe(console.log);

  };

  submitRegister(inputData: any) {
    // console.log('inputData from Form::', data);
    // const { username, password } = inputData;
    // TODO: sanitize input data
    this.authSv
      .addUser(inputData)
      .subscribe((data) => {
        // console.log('data registered::', data); => data has same props from inputData + its id from DB
        if (data) {
          if (data.id) {
            // TODO: check if username already exists
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', data.username);
          }
        }
      });
  };

  navigateToLogin() {
    this.router.navigate(['login']);
  };

}
