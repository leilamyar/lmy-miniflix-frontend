import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from "../../environments/environment";
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = env.baseUrl;

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<any> {
    const params = new HttpParams().set('username', username);
    return this.http
      .get<any>(this.baseUrl + '/users/', { params })
    // return req;
  }
  addUser(userData: any) {
    return this.http.post<any>(this.baseUrl + '/users', userData);
  }

  // TODO: rename this Sv into UserSv or smth

  deleteFilmFromUserList(user: User) {
    const req = this.http
      .delete(this.baseUrl + '/users/' + user.id,);
    return req;
  }

  /**
   * PUT: updates the User's Films List on the server.
   * Returns the updated User upon success.
  */
  updateUserList(user: User) {
    const req = this.http
      .put(this.baseUrl + '/users/' + user.id, user);
    return req;
  }
}
