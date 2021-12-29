import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent implements OnInit {

  @Input() film?: any;

  constructor() { }

  ngOnInit(): void {
  }

}
