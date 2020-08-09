import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Media, UserAction, UserMediaAction } from '../app.consts';
import { urlForSite, urlForAction } from '../app.endpoints';
import { AuthPostResponse } from '../components/auth/auth.types';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /* For user login and registration. */
  public loginURL = urlForAction(UserAction.Login);
  public registerURL = urlForAction(UserAction.Register);

  /* For authentication with social Media. */
  public tumblrAuthURL = urlForSite(Media.Tumblr, UserMediaAction.Auth); 
  public deviantArtAuthURL = urlForSite(Media.DeviantArt, UserMediaAction.Auth);
  private authRedirectSubject$ = new Subject<string>();

  private authSuccessSubject$ = new Subject<AuthPostResponse>();

  constructor(private http: HttpClient) { }

  public registerUser(username: string, password: string) {

  }

  public loginUser(username: string, password: string) {

  }

  public get loginRedirectSubject$() {
    return this.authRedirectSubject$;
  }

  public get authOutcomeSubject$() {
    return this.authSuccessSubject$;
  }

  authenticateUser(socialMedia: Media) {
    console.log("Authenticate the user: ", socialMedia);

    this.showAuthorizationPage(socialMedia)
      .subscribe((data: string) => {
        if (data) {
          console.log("Prepare to redirect: ", data);
          this.loginRedirectSubject$.next(data);
        } else {
          throw new Error(`Unable to authenticate the user for ${socialMedia}.`);
        }
      }, 
      (error: Error) => {
        this.loginRedirectSubject$.next(null);
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
          {responseType: 'text'});
      default:
        break;
    }
  }

  authSuccess(data: AuthPostResponse) {
    console.log("Auth succeeded: ", data);
    this.authOutcomeSubject$.next(data);
  }

  isLoggedIn(): boolean {
    return true;
  }
}