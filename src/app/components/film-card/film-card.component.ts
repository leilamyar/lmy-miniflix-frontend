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

  constructor(private authSv: AuthService) { }

  ngOnInit(): void {
  }

  addFilmToUser(idToAdd: number) {

    const filmIds = localStorage.getItem('list');
    const herList = filmIds?.split(',').map((idStr: string) => Number(idStr)).concat([idToAdd]);

    const reqBody: any = {
      id: Number(localStorage.getItem('userId')),
      username: localStorage.getItem('username'),
      herList,
    };
    // console.log('Faked on card event', id);
    const smth = this.authSv.updateUserList(reqBody).subscribe((up) => console.log(up));

    // this.onDeleteFilmFromUserList.emit(id);
    console.log('smth :', smth);

  }
}
