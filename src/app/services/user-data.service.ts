import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, Subscription } from 'rxjs';
import { UserData } from '../models/UserData';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private _isLoggedIn: boolean = false;
  private _initialUserData: UserData = {
    id: -1,
    firstname: '',
    // jwtToken,
    myList: [],
  };
  private _userData: UserData = this._initialUserData;

  constructor(private authSv: AuthService) { }

  getIsLoggedIn(): boolean { return this._isLoggedIn; }
  getUserFirstname(): string { return this._userData.firstname; }
  logOut(): boolean {
    this._isLoggedIn = false;
    this._userData = this._initialUserData;
    return this._isLoggedIn;
  }

  setUserData(formdata: any): Observable<string> {
    // TODO: make & return Custom Messages / Toaster / ...

    // this._authSub = this.authSv.login(formdata)
    //   .subscribe({
    //     next: (userData: UserData) => {
    //       this._userData = userData;
    //       this._isLoggedIn = true;
    //     },
    //     error: () => {
    //       console.log('[UserDataSv] An error occured logging user');
    //     }
    //   });
    // this._authSub = this.authSv.login(formdata)
    return this.authSv.login(formdata)
      .pipe(
        map((userData: UserData) => {
          console.log('[UserDataSv] mapping user data...', userData);
          this._userData = userData;
          this._isLoggedIn = true;
          return 'User is logged in';
        }),
        // catchError(err => { //TODO: check err handling w/ rxjs => return Error iso string ?
        //   console.log('[UserDataSv] An error occured logging user:', err);
        //   return '[UserDataSv] An error occured logging user';
        // }),
      );

  };

  // login(formData: any): any {
  //   return this.authSv.getUser(formData.username)
  //     .subscribe(
  //       {
  //         next: (userData) => {
  //           let user = userData[0];
  //           if (user) {
  //             if (user.password === formData.password) {
  //               // Set App Data : user, my list, is logged in
  //               this._userFirstname = user.firstname;
  //               this._userMyList = user.myList;
  //               this.updateLoggedIn();
  //               console.log('DATA:', this._isLoggedIn, this._userFirstname, this._userMyList);
  //             } else {
  //               // this.msg = 'The password is not correct';
  //             }
  //           } else {
  //             // this.msg = `The username "${this.fromForm.username}" doesn't exist`;
  //           };
  //           return user;
  //           // return of(user);
  //         },
  //         error: (err: string) => {
  //           // this.msg = 'An error occured. Please try again later.';
  //           console.log(err);
  //           return err;
  //         },
  //         complete: () => console.info('[Login Utils] Login Observer completed'),
  //       }
  //     );
  // }
}
