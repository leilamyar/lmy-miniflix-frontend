import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'film-slider',
  templateUrl: './film-slider.component.html',
  styleUrls: ['./film-slider.component.css']
})
export class FilmSliderComponent implements OnInit {

  @Input() filmListTitle?: string;
  films$?: Observable<any[]>;

  constructor(private filmsSv: FilmsService) { }

  ngOnInit(): void {
    this.films$ = this.filmsSv.getFilms();
  }

}
