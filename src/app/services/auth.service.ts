import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Media, UserMediaAction, AlertType } from '../app.consts';
import { urlForSite } from '../app.endpoints';
import { AuthPostResponse, AuthStatus } from '../components/auth/auth.types';
import { Observable, Subject } from 'rxjs';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /* For authentication with social Media. */
  public tumblrAuthURL = urlForSite(Media.Tumblr, UserMediaAction.Auth); 
  public deviantArtAuthURL = urlForSite(Media.DeviantArt, UserMediaAction.Auth);
  private mediaLoginRedirectSubject$ = new Subject<string>();
  private mediaAuthSubject$ = new Subject<AuthPostResponse>();

  constructor(
    private http: HttpClient, 
    private alert: AlertService,
    private localStorage: LocalStorageService,
    private router: Router) { }

  public get authRedirectSubject$() {
    return this.mediaLoginRedirectSubject$;
  }

  public get authSubject$() {
    return this.mediaAuthSubject$;
  }

  public isAuthorized() {
    return this.localStorage.isUserAuth();
  }

  public isAuthorizedForMedia(media: Media) {
    return this.localStorage.oAuthStatusForMedia(media) === AuthStatus.Success;
  }

  public redirectToAuthWithAlertMsg(alertMsg: string) {
    this.alert.showAlert(AlertType.Error, 'Failed to get user information. Please grant access to your Tumblr account.');
    this.router.navigateByUrl('/auth');
  }

  authenticateUser(socialMedia: Media) {
    console.log("Authenticate the user: ", socialMedia);

    this.showAuthorizationPage(socialMedia)
      .subscribe((data: string) => {
        if (data) {
          console.log("Prepare to redirect: ", data);
          this.authRedirectSubject$.next(data);
        } else {
          throw new Error(`Unable to authenticate the user for ${socialMedia}.`);
        }
      }, 
      (error: Error) => {
        this.authRedirectSubject$.next(null);
      });
  }

  showAuthorizationPage(socialMedia: Media): Observable<any> {
    switch (socialMedia) {
      case Media.DeviantArt:
        console.log("📘 Initiate DeviantArt authentication: ", this.deviantArtAuthURL);
        return this.http.get(this.deviantArtAuthURL,
          {responseType: 'text'});
      case Media.Tumblr:
        console.log("📘 Initiate Tumblr authentication: ", this.tumblrAuthURL);
        return this.http.get(
          this.tumblrAuthURL,
          {responseType: 'text', withCredentials: true });
      default:
        break;
    }
  }

  authSuccess(data: AuthPostResponse) {
    console.log("Auth succeeded: ", data);
    this.authSubject$.next(data);
  }
}