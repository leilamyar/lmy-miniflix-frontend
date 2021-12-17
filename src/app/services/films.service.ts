import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  private baseUrl = env.baseUrl;

  constructor(private http: HttpClient) { }

  getFilms(): Observable<any[]> {
    const res = this.http.get<any[]>(this.baseUrl + '/films');
    return res;
  }
}
