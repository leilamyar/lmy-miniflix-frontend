import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  films$?: Observable<any[]>;

  constructor(private filmsSv: FilmsService) { }

  ngOnInit(): void {
    this.films$ = this.filmsSv.getFilms();
  }

}
