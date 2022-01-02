import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observer, Subscription } from 'rxjs';
import { AppState } from 'src/app/models/AppState';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { MyListService } from 'src/app/services/my-list.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: any = FormGroup;
  msg = '';
  fromForm?: any;
  private user?: User;
  // private usersMyList?: any[];

  private authSubscription$?: Subscription;
  private myListSubscription$?: Subscription;

  private appState: AppState = {
    userId: -1,
    firstname: '',
    myList: [],
  };

  constructor(private fb: FormBuilder, private router: Router, private authSv: AuthService, private myListSv: MyListService) { }

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
    // TODO: replace by State / LS data
    if (this.user) {
      if (this.user.password === this.fromForm.password) {

        this.appState = {
          ...this.appState,
          userId: this.user.id,
          firstname: this.user.firstname,
        };
        // Find User's MyList
        this.myListSv.getMyListByUserId(this.user.id).subscribe({
          next: ml => {
            this.appState = {
              ...this.appState,
              myList: ml[0].myList,
            };
            // TODO: use RxJS .pipe() iso myList Subscr inside authSubscr
            localStorage.setItem('appState', JSON.stringify(this.appState));
            this.router.navigate(['browse']);
          },
          error: err => console.log('Login Comp: An Error occured on GET users films List. User ID:', this.user?.id, ' - error msg from Server:', err)
          ,
        });

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
    complete: () => { console.log('GET User By Id Succeeded'); },
  }


  submitLogin(inputData: any) {
    this.fromForm = inputData;
    if (inputData.username) {
      this.authSubscription$ = this.authSv.getUser(inputData.username)
        .subscribe(this.observer);
    } else {
      this.msg = `Please enter a username`;
    }
  };

  ngOnDestroy() {
    this.authSubscription$?.unsubscribe();
    this.myListSubscription$?.unsubscribe();
    // TODO: check unsubscribe Best Practice
    console.log('[LoginComp] Destroyed');
  }
}
