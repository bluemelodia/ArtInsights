import { Injectable } from '@angular/core';
import { Media, DeviantArtOAuthKey, TumblrOAuthKey, AuthTokenKey } from '../app.consts';
import { AuthStatus } from '../components/auth/auth.types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  public TumblrOAuthSubject$ = new BehaviorSubject(AuthStatus.Unattempted);
  public DeviantArtOAuthSubject$ = new BehaviorSubject(AuthStatus.Unattempted);

  /* Store the auth token returned from the server. To be sent on each post-login request. */
  public storeAuthToken(token: string) {
    console.log("Store the user auth token: ", token);
    localStorage.setItem(AuthTokenKey, token);
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
        localStorage.setItem(DeviantArtOAuthKey, authStatus);
        this.DeviantArtOAuthSubject$.next(authStatus);
        break;
      case Media.Tumblr:
        console.log("Set Tumblr auth key: ", authStatus);
        localStorage.setItem(TumblrOAuthKey, authStatus);
        this.TumblrOAuthSubject$.next(authStatus);
        break;
    }
  }

  public oAuthStatusForMedia(mediaType: Media): AuthStatus {
    let key: AuthStatus;
    switch (mediaType) {
      case Media.DeviantArt:
        key = localStorage.getItem(DeviantArtOAuthKey) as AuthStatus;
        break;
      case Media.Tumblr:
        key = localStorage.getItem(TumblrOAuthKey) as AuthStatus;
        break;
    }
    return key;
  }

  /* Logout or start new session. */
  public resetKeys() {
    localStorage.removeItem(AuthTokenKey);
    localStorage.setItem(DeviantArtOAuthKey, AuthStatus.Unattempted);
    localStorage.setItem(TumblrOAuthKey, AuthStatus.Unattempted);
  }
}
