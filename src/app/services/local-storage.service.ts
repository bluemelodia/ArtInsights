import { Injectable } from '@angular/core';
import { Media, DeviantArtOAuthKey, TumblrOAuthKey, AuthTokenKey } from '../app.consts';
import { AuthStatus } from '../components/auth/auth.types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  private TumblrOAuthSubject$ = new BehaviorSubject(AuthStatus.Unattempted);
  private DeviantArtOAuthSubject$ = new BehaviorSubject(AuthStatus.Unattempted);

  public tumblrOAuth$() {
    return this.TumblrOAuthSubject$.asObservable();
  }

  public deviantArtOAuth$() {
    return this.DeviantArtOAuthSubject$.asObservable();
  }

  /* Store the auth token returned from the server. To be sent on each post-login request. */
  public storeAuthToken(token: string) {
    console.log("Store the user auth token: ", token);
    sessionStorage.setItem(AuthTokenKey, token);
  }

  /* Check if the user auth at least one social media. */
  public isUserAuth() {
    return this.oAuthStatusForMedia(Media.DeviantArt) === AuthStatus.Success || 
      this.oAuthStatusForMedia(Media.Tumblr) === AuthStatus.Success;
  }

  /* Use local storage to store OAuth status for each social media. Users
  * will need to re-authorize on every session. */
  public setOAuthKey(mediaType: Media, authStatus: AuthStatus) {
    switch (mediaType) {
      case Media.DeviantArt:
        console.log("Set DA auth key: ", authStatus);
        sessionStorage.setItem(DeviantArtOAuthKey, authStatus);
        this.DeviantArtOAuthSubject$.next(authStatus);
        break;
      case Media.Tumblr:
        console.log("Set Tumblr auth key: ", authStatus);
        sessionStorage.setItem(TumblrOAuthKey, authStatus);
        this.TumblrOAuthSubject$.next(authStatus);
        break;
    }
  }

  /* This is not a reset. It's used to let all subscribers know the 
   * current OAuth status for each social media. We need this because on user
   * page refresh, the nav bar, auth pages, etc. will not have the up to date
   * info on the auth statuses. */
  public refreshOAuthStatuses() {
    const deviantArtStatus = sessionStorage.getItem(DeviantArtOAuthKey) as AuthStatus;
    this.DeviantArtOAuthSubject$.next(deviantArtStatus);

    const tumblrStatus = sessionStorage.getItem(TumblrOAuthKey) as AuthStatus;
    this.TumblrOAuthSubject$.next(tumblrStatus);
  }

  public oAuthStatusForMedia(mediaType: Media): AuthStatus {
    let key: AuthStatus;
    switch (mediaType) {
      case Media.DeviantArt:
        key = sessionStorage.getItem(DeviantArtOAuthKey) as AuthStatus;
        break;
      case Media.Tumblr:
        key = sessionStorage.getItem(TumblrOAuthKey) as AuthStatus;
        break;
    }
    return key;
  }

  /* Logout or start new session. */
  public resetKeys() {
    sessionStorage.removeItem(AuthTokenKey);
    sessionStorage.setItem(DeviantArtOAuthKey, AuthStatus.Unattempted);
    sessionStorage.setItem(TumblrOAuthKey, AuthStatus.Unattempted);
  }
}
