import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit, OnDestroy {

  filmListTitle = 'New & Popular';
  // TODO: handle list filters

  films$?: Observable<any[]>;

  constructor(private filmsSv: FilmsService) { }

  ngOnInit(): void { this.films$ = this.filmsSv.getFilms(); };
  ngOnDestroy(): void {
    console.log('[BrowseComp] Destroyed');
  }
}
