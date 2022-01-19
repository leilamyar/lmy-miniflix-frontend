import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private dataSv: DataService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isLoggedIn = this.dataSv.getIsLoggedIn();
    ;
    // const isLoggedIn = (localStorage.getItem('appState')) ? true : false;
    // console.log('header firstname', appState.firstname);

    if (!isLoggedIn) {
      this.router.navigate(['login']);
      return false;
    };

    return true;
  }

}
