import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  private apiUrl = 'http://localhost:5000/films/';

  constructor(private http: HttpClient) { }

  getFilms(): Observable<any[]> {
    const res = this.http.get<any[]>(this.apiUrl);
    console.log('res:::', res);

    return res;
  }
}
