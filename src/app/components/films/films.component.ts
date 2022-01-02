import { Component, Input } from '@angular/core';
// import { Observable } from 'rxjs';

@Component({
  selector: 'films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})

export class FilmsComponent {
  @Input() films?: any[];
  // @Input() films$?: Observable<any[]>;
}
