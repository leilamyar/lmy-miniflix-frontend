import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;
  isLoggedIn: any;
  // hello user doesn't work in header unless we refresh
  // TODO: pass isLoggedIn from App Comp

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.isLoggedIn = localStorage.getItem('isLoggedIn');
  }

  logOut() {
    localStorage.clear();
    this.isLoggedIn = false;
    console.log('from LS:', localStorage.getItem('isLoggedIn'));
    console.log('from LS:', localStorage.getItem('user'));

    this.router.navigate(['/']);
  }

}
