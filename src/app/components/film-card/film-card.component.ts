import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent implements OnInit {

  @Input() film?: any;
  @Output() onAddFilmUser: EventEmitter<any> = new EventEmitter();

  constructor(private authSv: AuthService) {

  }

  ngOnInit(): void {
  }

  addFilmToUser(idToAdd: number) {
    // TODO: impl Directive to check in App(State) if this.film is in user films list
    // & change icon only if PUT req / DELETE req worked (err triggers Toaster ? https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_snackbar )
    // see Fireship  https://www.youtube.com/watch?v=kl-UMCHpEsw
    // the https://www.youtube.com/watch?v=dQIMLPNB8W4
    const filmIds = localStorage.getItem('list');
    // FIXME: LS doesn't update when user film list is updated
    // TODO : impl RxJS Subj to trigger an new value emission (iso Observable, which are passive)
    // in this Comp ? Or Browse / MyList and pass it here ?
    // see Academind  https://www.youtube.com/watch?v=rdK92pf3abs&list=PL55RiY5tL51pHpagYcrN9ubNLVXF8rGVi&index=5
    // in App(State) (see AuthSv refactoring todo note), create - see tut 1:45
    // a new Subject() that will emit a val of new film list using .next(newValue)
    // MyList will subscribe to it
    // impl subj.error() error, to handle errors (eg: on film list PUT req)
    // NB: Subj can have more than 1 subscriber ; this means, Browse can also subscr to it & display MyList
    // as 1st slider (as in the real NetFlix webapp)
    // NB : Subj have no initial value ---> use BehaviourSubj instead
    // see https://www.youtube.com/watch?v=-mwNLRbfKmU&list=PL55RiY5tL51pHpagYcrN9ubNLVXF8rGVi&index=12

    const herList = filmIds?.split(',').map((idStr: string) => Number(idStr)).concat([idToAdd]);

    const reqBody: any = {
      id: Number(localStorage.getItem('userId')),
      username: localStorage.getItem('username'),
      herList,
    };
    // console.log('Faked on card event', id);
    // const smth = this.authSv.updateUserList(reqBody).subscribe((up) => console.log(up));

    // this.onDeleteFilmFromUserList.emit(id);
    // console.log('smth :', smth);

  }
}
