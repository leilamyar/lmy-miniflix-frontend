import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'film-slider',
  templateUrl: './film-slider.component.html',
  styleUrls: ['./film-slider.component.css']
})

export class FilmSliderComponent {

  @Input() filmListTitle?: string;
  @Input() films$?: Observable<any[]>;

}
