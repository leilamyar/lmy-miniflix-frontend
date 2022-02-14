import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment as env } from "../../environments/environment";
import { UserData } from '../models/UserData';

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

  // SHOULD BE CALLED BY SERVICES ONLY
  login(formData: any): Observable<UserData> {
    return this.getUser(formData.username)
      .pipe(
        map((userData) => {
          // TODO: check pwd, etc. using JWT
          // if (userData.password == formData.password) {
          //   console.log('Pwd are ok');
          // }
          let { id, myList, firstname } = userData[0];
          return ({
            id,
            firstname,
            myList,
          });
          // } else {
          //   console.log('user NOT OK !');
          //   return 'user not auth';
          // }
        }),
      );
  }
}
