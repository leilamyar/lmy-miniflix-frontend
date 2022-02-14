import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { filter, Subscription, tap } from 'rxjs';
import { MY_LIST_ACTIONS } from 'src/app/actions/myList.actions';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserService } from 'src/app/services/user.service';

enum ICON {
  ADD_ICON = 'add-btn',
  REMOVE_ICON = 'remove-btn',
};

@Component({
  selector: 'film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})

export class FilmCardComponent implements OnInit, OnDestroy {

  @Input() film: any;
  icon: ICON;
  // private subscr: Subscription;

  constructor(private userSv: UserService, private userDataSv: UserDataService) { }

  ngOnInit(): void {
    this.icon = (this.userDataSv.getUserMyList().includes(this.film.id)) ? ICON.REMOVE_ICON : ICON.ADD_ICON;
  }

  addFilmToUser(filmId: number) {

    if (this.icon === ICON.ADD_ICON) {
      // this.subscr = this.userDataSv
      this.userDataSv
        .updateUserMyList(MY_LIST_ACTIONS.ADD, filmId)
        .subscribe((/*successMsg*/) => {
          this.icon = ICON.REMOVE_ICON;
          console.log('added !');
        });
    } else {
      // this.subscr = this.userDataSv
      this.userDataSv
        .updateUserMyList(MY_LIST_ACTIONS.REMOVE, filmId)
        .subscribe((/*successMsg*/) => {
          this.icon = ICON.ADD_ICON;
          console.log('removed !');
        });
    }
    // TODO handle error in Toaster / ...
  }

  ngOnDestroy(): void {
    // console.log('[FilmCardComp] Destroyed');
    // FIXME: this.subscr undefined when navigating from browse to myList
    // this.subscr.unsubscribe();:
  }
}
