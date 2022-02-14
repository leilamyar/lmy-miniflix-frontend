import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, map, Subscription } from 'rxjs';
import { Film } from 'src/app/models/Film';

import { FilmsService } from 'src/app/services/films.service';
import { UserDataService } from 'src/app/services/user-data.service';


@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit, OnDestroy {

  filmList: any[];
  private _subscription: Subscription;

  constructor(private filmsSv: FilmsService, private userDataSv: UserDataService) { }

  ngOnInit(): void {
    const httpCall$ = this.userDataSv.getUserMyList().map((id: number) => this.filmsSv.getFilmById(id));
    this._subscription = forkJoin(httpCall$)
      .subscribe((data: any) => this.filmList = data.map((curr: any) => curr[0]));
  }
  // FIXME: film-card not removed from MyList View

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
