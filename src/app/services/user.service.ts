import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from "../../environments/environment";
import { AppState } from '../models/AppState';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = env.baseUrl;

  constructor(private http: HttpClient) { }

  // getMyListByUserId(userId: number): Observable<any> {
  //   const req = this.http
  //     .get<any>(this.baseUrl + '/users/' + userId)
  //   // .pipe(
  //   //   // tap(console.log),
  //   //   // map((data: any) => data.myList),
  //   // );

  //   return req;
  // }

  /**
   * 
   * @param newList array of films ids to add to user's list
   * @returns 
   */
  updateUserMyList(userId: number, newList: number[]) {
    let reqBody = {
      "myList": newList,
    };
    const req = this.http
      .patch(this.baseUrl + '/users/' + userId, reqBody);
    // .pipe(
    //   tap(console.log),
    //   map((data: any) => data)
    // );
    return req;
  }
}
