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
  msg = '';

  private users: any[] = [];

  constructor(private fb: FormBuilder,
    private authSv: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      // email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    // Extract values from the form:
    // this.registerForm.valueChanges.subscribe(console.log);

    this.authSv.getUser()
      .subscribe((data) => {
        this.users = data;
      });
    // TODO: put users list in Store for single src of truth betw Login & Reg Comp
  };

  submitRegister(inputData: any) {
    // TODO: sanitize input data
    if (inputData.username) {
      let fromDb = this.users.find(u => u.username === inputData.username);
      if (fromDb) {
        this.msg = `The username "${inputData.username}" already exists`;
      } else {
        this.authSv
          .addUser(inputData)
          .subscribe((data) => {
            if (data) {
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('user', data.username);
              this.router.navigate(['films']);
            }
          });
      }
    } else {
      this.msg = `Please enter a username`;
    }
  };

}
