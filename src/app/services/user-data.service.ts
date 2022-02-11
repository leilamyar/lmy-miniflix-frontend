import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, Subscription } from 'rxjs';
import { MY_LIST_ACTIONS } from '../actions/myList.actions';
import { UserData } from '../models/UserData';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

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

  constructor(private authSv: AuthService, private userSv: UserService) { }

  getIsLoggedIn(): boolean { return this._isLoggedIn; }
  getUserFirstname(): string { return this._userData.firstname; }
  getUserMyList(): number[] { return this._userData.myList; }

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

  updateUserMyList(action: MY_LIST_ACTIONS, filmId: number) {
    let newMyList: number[];
    switch (action) {
      case MY_LIST_ACTIONS.ADD:
        newMyList = [...this._userData.myList, filmId];
        return this.userSv
          .updateUserMyList(this._userData.id, newMyList)
          .pipe(
            map((/*updatedUser*/) => {
              this._userData.myList = newMyList;
              return 'List updated !';
            }),
          );
      // break;
      case MY_LIST_ACTIONS.REMOVE:
        newMyList = this._userData.myList.filter((fid) => fid != filmId);
        return this.userSv
          .updateUserMyList(this._userData.id, newMyList)
          .pipe(
            map((/*updatedUser*/) => {
              this._userData.myList = newMyList;
              return 'List updated !';
            }),
          );
      default:
        return of('Default action reached')
        break;
    }
  }
}
