import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = env.baseUrl;

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get<any>(this.baseUrl + '/users');
  }
}
