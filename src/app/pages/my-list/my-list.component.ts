import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  filmList?: any[];

  constructor(private filmsSv: FilmsService) { }

  ngOnInit(): void {
    // TODO: Store user's film ids w/ NgRx
    const filmIds = localStorage.getItem('list');

    if (filmIds) {
      const httpCall$ = filmIds
        .split(',').map((idStr) => Number(idStr))
        .map((id) => this.filmsSv.getFilmById(id));

      // ForkJoin works as Promise.all
      forkJoin(httpCall$)
        .subscribe((data: any) => this.filmList = data.map((curr: any) => curr[0]));

    } else {
      console.log('No Film Ids Found');
    }
  }

}
