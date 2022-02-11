import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { Film } from 'src/app/models/Film';

import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit, OnDestroy {

  filmList: any[];

  constructor(private filmsSv: FilmsService) { }

  ngOnInit(): void {

    const result = this.filmsSv.getFilms().pipe(
      map((films) => {
        const httpCall$ = films.map((f: Film) => this.filmsSv.getFilmById(f.id));
        console.log('httpCalls:::', httpCall$);
        let sss = forkJoin(httpCall$)
          .subscribe((data: any) => this.filmList = data.map((curr: any) => curr[0]));
        console.log('sss to unsubs ?', sss);

      }),
    );
    // const httpCall$ = filmIds.map((id: number) => this.filmsSv.getFilmById(id));
    // forkJoin(httpCall$)
    //   .subscribe((data: any) => this.filmList = data.map((curr: any) => curr[0]));

    console.log('RESULT::', result);

  }

  ngOnDestroy(): void {
    console.log('[MyListComp] Destroyed');

  }
}
