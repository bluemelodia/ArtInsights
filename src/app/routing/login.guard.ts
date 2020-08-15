import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthTokenKey } from '../app.consts';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("🚔 Do we have an auth token?");
    if (localStorage.getItem(AuthTokenKey)) { return true; }

    console.log("🚔 No auth token, bye!");

    this.router.navigateByUrl('/login');
    return false;
  }
}
