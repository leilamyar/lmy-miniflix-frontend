import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { map, tap } from 'rxjs';
import { AppState } from 'src/app/models/AppState';
import { MyListService } from 'src/app/services/my-list.service';
import { appStateSelector, myListSelector } from 'src/app/utils/appState.utils';

@Component({
  selector: 'film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent implements OnInit, OnDestroy {

  @Input() film?: any;
  // @Output() onAddFilmUser: EventEmitter<any> = new EventEmitter();

  constructor(private myListSv: MyListService) { }

  ngOnInit(): void {
  }

  addFilmToUser(filmIdToAdd: number) {
    const appState = appStateSelector(localStorage);

    if (appState) {

      // FIXME: LS doesn't update when user film list is updated

      // const reqBody: any = {
      //   id: Number(localStorage.getItem('userId')),
      //   username: localStorage.getItem('username'),
      //   herList,
      // };
      // const reqBody: MyList = {
      //   userId: appState.userId,
      //   myList: [...newMyList],
      //   liked: [...appState.liked],
      // };


      const appState = appStateSelector(localStorage);

      const currMyList = myListSelector(appState);
      // const newMyList = [...filmIds, filmIdToAdd];
      // const newAppState = { ...appState };
      const newAppState: AppState = {
        ...appState,
        // userId: appState.userId,
        myList: [...currMyList, filmIdToAdd],
        // liked: [...appState.liked],
      };

      this.myListSv.updateUserList(newAppState)
        .subscribe(data => {
          console.log('Update List Subscr :', data);
          localStorage.removeItem(appState);
          localStorage.setItem('appState', JSON.stringify(newAppState));
        });

      // console.log('Faked on card event', id);
      // const smth = this.authSv.updateUserList(reqBody).subscribe((up) => console.log(up));
    } else {
      console.error('Error with AppState Selector');
      throw new Error("Error with AppState Selector using LocalStorage");
    }
  }

  ngOnDestroy(): void {
    console.log('[FilmCardComp] Destroyed');
  }
}
