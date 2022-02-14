import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  firstname: any;
  isLoggedIn: boolean = false;

  constructor(private router: Router, private userDataSv: UserDataService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userDataSv.getIsLoggedIn();
    this.firstname = this.userDataSv.getUserFirstname();
  }

  logOut() {
    this.isLoggedIn = this.userDataSv.logOut();
    this.router.navigate(['login']);
  }

}
