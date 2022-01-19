import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { UserData } from '../models/LoggedInData';
import { User } from '../models/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private initUserData: UserData = { firstname: '' };
  private userData: UserData = this.initUserData;
  private isLoggedIn: boolean = false;
  private userMyList: number[] = [];

  private subject = new Subject<boolean>();

  constructor(private authSv: AuthService) { }

  getFirstname(): string { return this.userData.firstname; }
  getIsLoggedIn(): boolean { return this.isLoggedIn; }
  updateIsLoggedIn(): void {
    this.isLoggedIn = !this.isLoggedIn;
    if (!this.isLoggedIn) {
      this.userData = this.initUserData;
    }
    this.subject.next(this.isLoggedIn);
  }
  // onLogOut(): void {
  //   this.isLoggedIn = false;
  //   this.userData = this.initUserData;
  //   this.subject.next(this.isLoggedIn);
  // }
  onLoggedInUpdate(): Observable<any> {
    return this.subject.asObservable();
  }

  login(formData: any): any {
    let yy = this.authSv.getUser(formData.username)
      .subscribe(
        {
          next: (userData) => {
            let user = userData[0];
            if (user) {
              if (user.password === formData.password) {
                this.userData = { firstname: user.firstname };
                this.userMyList = user.myList;
                // this.isLoggedIn = true;
                this.updateIsLoggedIn();

                console.log('DATA:', this.isLoggedIn, this.userData, this.userMyList);
              } else {
                // this.msg = 'The password is not correct';
              }
            } else {
              // this.msg = `The username "${this.fromForm.username}" doesn't exist`;
            };
            return user;
            // return of(user);
          },
          error: (err: string) => {
            // this.msg = 'An error occured. Please try again later.';
            console.log(err);
            return err;
          },
          complete: () => console.info('[Login Utils] Login Observer completed'),
        }
      );
  }
}