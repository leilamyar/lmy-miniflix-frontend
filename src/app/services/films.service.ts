import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  // TODO: put root url into .env files
  private apiUrl = 'http://localhost:5000/films/';

  constructor(private http: HttpClient) { }

  getFilms(): Observable<any[]> {
    const res = this.http.get<any[]>(this.apiUrl);
    return res;
  }
}
