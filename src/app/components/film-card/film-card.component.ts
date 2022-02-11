import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { filter, Subscription, tap } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
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
  // @Output() addFilmToMyList: any;
  icon: ICON;
  private inMyList: boolean;

  private subscr: Subscription;

  constructor(private dataSv: DataService, private userSv: UserService) { }

  ngOnInit(): void {
    // this.myList$ = this.dataSv.getMyList();
    this.inMyList = this.dataSv.getMyList().includes(this.film.id);

    this.icon = (this.dataSv.getMyList().includes(this.film.id)) ? ICON.REMOVE_ICON : ICON.ADD_ICON;


  }

  addFilmToUser(filmId: number) {

    this.dataSv.addFilmToMyList(filmId);

    // const appState = appStateSelector(localStorage);
    // if (appState) {
    //   const appState = appStateSelector(localStorage);
    //   const currentMyList = myListSelector(appState);

    // if (!currentMyList.includes(filmIdToAdd)) {

    // const newAppState: AppState = {
    //   ...appState,
    //   myList: [...currentMyList, filmIdToAdd],
    // };
    //     this.userSv.updateUserList(newAppState)
    //       .subscribe(data => {
    //         localStorage.removeItem(appState);
    //         localStorage.setItem('appState', JSON.stringify(newAppState));
    //       });
    //   }
    // } else {
    //   console.error('Error with AppState Selector');
    //   throw new Error("Error with AppState Selector using LocalStorage");
    // }
  }

  ngOnDestroy(): void {
    // console.log('[FilmCardComp] Destroyed');
    // this.subscr.unsubscribe();
  }
}
