import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthTokenKey } from '../app.consts';
import { RedirectService } from '../services/redirect.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private redirect: RedirectService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("🚔 Do we have an auth token?", sessionStorage);
    if (sessionStorage.getItem(AuthTokenKey)) { return true; }

    console.log("🚔 No auth token, bye!");

    this.redirect.route('/login');
    return false;
  }
}
