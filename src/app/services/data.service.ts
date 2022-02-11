import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { UserData } from '../models/UserData';
import { User } from '../models/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private initUserData: UserData = { firstname: '' };
  // private userData: UserData = this.initUserData;
  private isLoggedIn: boolean = false;
  private userMyList: number[] = [];

  private loginSubject = new Subject<boolean>();
  // private myListSubject = new BehaviorSubject<number[]>(this.userMyList);
  // private myListSubject = new Subject<number[]>();

  constructor(private authSv: AuthService) { }

  // getFirstname(): string { return this.userData.firstname; }
  getIsLoggedIn(): boolean { return this.isLoggedIn; }
  getMyList(): number[] { return this.userMyList; }
  // updateIsLoggedIn(): void {
  //   this.isLoggedIn = !this.isLoggedIn;
  //   if (!this.isLoggedIn) {
  //     this.userData = this.initUserData;
  //   }
  //   this.loginSubject.next(this.isLoggedIn);
  // }
  // onLogOut(): void {
  //   this.isLoggedIn = false;
  //   this.userData = this.initUserData;
  //   this.subject.next(this.isLoggedIn);
  // }
  onLoggedInUpdate(): Observable<any> {
    return this.loginSubject.asObservable();
  }

  // login(formData: any): any {
  //   let yy = this.authSv.getUser(formData.username)
  //     .subscribe(
  //       {
  //         next: (userData) => {
  //           let user = userData[0];
  //           if (user) {
  //             if (user.password === formData.password) {
  //               // Set App Data : user, my list, is logged in
  //               this.userData = { firstname: user.firstname };
  //               this.userMyList = user.myList;
  //               this.updateIsLoggedIn();
  //               console.log('DATA:', this.isLoggedIn, this.userData, this.userMyList);
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

  addFilmToMyList(filmId: number) {
    console.log('Old list:', this.userMyList);
    let newList = [...this.userMyList, filmId];
    console.log('NEW list:', newList);
    // this.myListSubject.next(newList);
  }
  // onMyListUpdate(): Observable<any> {
  //   return this.myListSubject.asObservable();
  // }
}