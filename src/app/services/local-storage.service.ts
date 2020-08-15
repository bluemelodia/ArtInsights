import { Injectable } from '@angular/core';
import { Media, DeviantArtOAuthKey, TumblrOAuthKey } from '../app.consts';
import { AuthStatus } from '../components/auth/auth.types';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

    /* Use local storage to store OAuth status for each social media. Users
    * will need to re-authorize on every session. */
    public setOAuthKey(mediaType: Media, authStatus: AuthStatus) {
      switch (mediaType) {
        case Media.DeviantArt:
          localStorage.setItem(DeviantArtOAuthKey, authStatus);
          break;
        case Media.Tumblr:
          localStorage.setItem(TumblrOAuthKey, authStatus);
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

    public isUserAuth() {
      return this.oAuthStatusForMedia(Media.DeviantArt) === AuthStatus.Success || 
        this.oAuthStatusForMedia(Media.Tumblr) === AuthStatus.Success;
    }
}
