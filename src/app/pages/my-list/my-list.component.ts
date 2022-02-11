import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { FilmsService } from 'src/app/services/films.service';
import { appStateSelector, myListSelector } from 'src/app/utils/appState.utils';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit, OnDestroy {

  filmList: any[];

  constructor(private filmsSv: FilmsService) { }

  ngOnInit(): void {
    const appState = appStateSelector(localStorage);

    if (appState) {
      const filmIds = myListSelector(appState);
      const httpCall$ = filmIds.map((id: number) => this.filmsSv.getFilmById(id));
      forkJoin(httpCall$)
        .subscribe((data: any) => this.filmList = data.map((curr: any) => curr[0]));
    } else {
      console.log('No Film Ids Found');
    }
  }

  ngOnDestroy(): void {
    console.log('[MyListComp] Destroyed');

  }
}
