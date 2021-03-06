import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Media, UserMediaAction, AlertType } from '../app.consts';
import { urlForSite } from '../app.endpoints';
import { AuthPostResponse, AuthStatus, AuthRedirectResponse } from '../components/auth/auth.types';
import { Observable, Subject } from 'rxjs';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { RedirectService } from './redirect.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /* For authentication with social Media. */
  public tumblrAuthURL = urlForSite(Media.Tumblr, UserMediaAction.Auth); 
  public deviantArtAuthURL = urlForSite(Media.DeviantArt, UserMediaAction.Auth);
  private mediaLoginRedirectSubject$ = new Subject<AuthRedirectResponse>();
  private mediaAuthSubject$ = new Subject<AuthPostResponse>();

  constructor(
    private http: HttpClient, 
    private alert: AlertService,
    private storage: LocalStorageService,
    private redirect: RedirectService,
    private router: Router) { }

  public get authRedirect$() {
    return this.mediaLoginRedirectSubject$.asObservable();
  }

  public get auth$() {
    return this.mediaAuthSubject$.asObservable();
  }

  public isAuthorized() {
    return this.storage.isUserAuth();
  }

  public isAuthorizedForMedia(media: Media) {
    console.log("Authorized for media? ", media, this.storage.oAuthStatusForMedia(media));
    return this.storage.oAuthStatusForMedia(media) === AuthStatus.Success;
  }

  public refreshAuthStatuses() {
    this.storage.refreshOAuthStatuses();
  }

  public userUnauthForMedia(media: Media) {
    this.storage.setOAuthKey(media, AuthStatus.Unattempted);
    this.alert.showAlert(AlertType.Error, `Failed to get user information. Please grant access to your ${media} account.`);
    this.redirect.route('/auth');
  }

  authenticateUser(socialMedia: Media) {
    console.log("Authenticate the user: ", socialMedia);

    this.showAuthorizationPage(socialMedia)
      .subscribe((data: string) => {
        if (data) {
          console.log("Prepare to redirect: ", data);
          this.mediaLoginRedirectSubject$.next({
            redirect: data, 
            mediaType: socialMedia
          });
        } else {
          throw new Error(`Unable to authenticate the user for ${socialMedia}.`);
        }
      }, 
      (error: Error) => {
        this.mediaLoginRedirectSubject$.next({
          redirect: null,
          mediaType: socialMedia
        });
      });
  }

  /* Calling this indicates the user does not want to use this social media. Erase the key from local storage. */
  unauthenticateUser(socialMedia: Media) {
    this.storage.setOAuthKey(socialMedia, AuthStatus.Unattempted);
  }

  showAuthorizationPage(socialMedia: Media): Observable<any> {
    switch (socialMedia) {
      case Media.DeviantArt:
        console.log("📘 Initiate DeviantArt authentication: ", this.deviantArtAuthURL);
        return this.http.get(
          this.deviantArtAuthURL,
          {responseType: 'text', withCredentials: true });
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
    this.mediaAuthSubject$.next(data);
  }
}