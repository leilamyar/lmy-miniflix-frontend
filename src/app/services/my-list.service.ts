import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment as env } from "../../environments/environment";
import { AppState } from '../models/AppState';

@Injectable({
  providedIn: 'root'
})
export class MyListService {

  private baseUrl = env.baseUrl;

  constructor(private http: HttpClient) { }

  getMyListByUserId(userId: number): Observable<any> {
    const req = this.http
      .get<any>(this.baseUrl + '/users/' + userId)
    // .pipe(
    //   // tap(console.log),
    //   // map((data: any) => data.myList),
    // );

    return req;
  }

  // deleteFilmFromUserList(user: User) {
  //   const req = this.http
  //     .delete(this.baseUrl + '/users/' + user.id,);
  //   return req;
  // }

  /**
   * PUT: updates the User's Films List on the server.
   * Returns the updated User upon success.
  */
  updateUserList(updatedAppState: AppState) {
    const req = this.http
      .put(this.baseUrl + '/users/' + updatedAppState.userId, updatedAppState)
    // .pipe(
    //   tap(console.log),
    //   map((data: any) => data)
    // );
    return req;
  }
}
