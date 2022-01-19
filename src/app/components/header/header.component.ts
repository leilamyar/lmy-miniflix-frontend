import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  firstname: any;
  isLoggedIn: boolean = false;
  isLoginSubsc?: Subscription;


  constructor(private router: Router, private dataSv: DataService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.dataSv.getIsLoggedIn();
    this.firstname = this.dataSv.getFirstname();
  }

  logOut() {
    // this.isLoggedIn = false;
    // this.router.navigate(['/login']);

    this.isLoginSubsc = this.dataSv
      .onLoggedInUpdate()
      .subscribe(() => this.router.navigate(['login']));
  }

  ngOnDestroy() {
    this.isLoginSubsc?.unsubscribe();
  }

}
