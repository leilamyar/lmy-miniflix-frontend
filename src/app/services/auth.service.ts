import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from "../../environments/environment";

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
}
