import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppState } from 'src/app/models/AppState';
import { UserService } from 'src/app/services/user.service';
import { appStateSelector, myListSelector } from 'src/app/utils/appState.utils';

@Component({
  selector: 'film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent implements OnInit, OnDestroy {

  @Input() film?: any;

  constructor(private userSv: UserService) { }

  ngOnInit(): void { }

  addFilmToUser(filmIdToAdd: number) {

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
    console.log('[FilmCardComp] Destroyed');
  }
}
