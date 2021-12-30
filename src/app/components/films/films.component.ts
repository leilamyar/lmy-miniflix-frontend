import { Component, Input } from '@angular/core';

@Component({
  selector: 'films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})

export class FilmsComponent {
  @Input() films?: any[];
}
