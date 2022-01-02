import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  firstname: any;
  isLoggedIn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const appState = localStorage.getItem('appState') ? JSON.parse((localStorage.getItem('appState') || '')) : null;
    this.firstname = appState.firstname;
    this.isLoggedIn = appState ? true : false;
  }

  logOut() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
