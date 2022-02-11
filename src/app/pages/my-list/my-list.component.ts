import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, map, Subscription } from 'rxjs';
import { Film } from 'src/app/models/Film';

import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit, OnDestroy {

  filmList: any[];
  private _subscription: Subscription;

  constructor(private filmsSv: FilmsService) { }

  ngOnInit(): void {
    this.filmsSv.getFilms().pipe(
      map((films) => {
        const httpCall$ = films.map((f: Film) => this.filmsSv.getFilmById(f.id));
        this._subscription = forkJoin(httpCall$)
          .subscribe((data: any) => this.filmList = data.map((curr: any) => curr[0]));
      }),
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
