import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment as env } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MyListService {

  private baseUrl = env.baseUrl;

  constructor(private http: HttpClient) { }

  getMyListByUserId(userId: number): Observable<any> {
    const params = new HttpParams().set('userId', userId);
    const req = this.http
      .get<any>(this.baseUrl + '/usersMyList/', { params })
    // .pipe(
    //   tap(console.log),
    //   map((data: any) => data)
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
  updateUserList(userMyListState: any) {
    const req = this.http
      .put(this.baseUrl + '/usersMyList/' + userMyListState.userId, userMyListState);
    return req;
  }
}
