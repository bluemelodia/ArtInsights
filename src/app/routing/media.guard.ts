import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthStatus } from '../components/auth/auth.types';
import { AuthService } from '../services/auth.service';
import { Media } from '../app.consts';

@Injectable({
  providedIn: 'root'
})
export class MediaGuard implements CanActivate {
  constructor(
    private auth: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("🚔 Is the user OAuth for this media?");
    if (this.auth.isAuthorizedForMedia(next.data.media as Media)) { return true; }

    console.log("🚔 Not auth for this media, bye!");

    return false;
  }
}