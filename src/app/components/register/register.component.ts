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
  };

  submitRegister(inputData: any) {
    // TODO: sanitize input data
    if (inputData.username) {
      let fromDb;
      this.authSv.getUser(inputData.username)
        .subscribe((data) => {
          fromDb = data;
          // TODO: refactor (like login comp) to handle errors
        });
      // this.users.find(u => u.username === inputData.username);
      if (fromDb) {
        this.msg = `The username "${inputData.username}" already exists`;
      } else {
        this.authSv
          .addUser(inputData)
          .subscribe((data) => {
            if (data) {
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('user', data.username);
              this.router.navigate(['browse']);
            }
          });
      }
    } else {
      this.msg = `Please enter a username`;
    }
  };

}
