import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // loginForm = new FormGroup({
  //   username: new FormControl(null, Validators.required),
  //   password: new FormControl(null, Validators.required),
  // });

  // loginForm?: FormGroup;

  // constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.loginForm = this.fb.group({
    //   username: '',
    //   password: '',
    // });
    // // Extract values from the form:
    // this.loginForm.valueChanges.subscribe(console.log);

  };

}
