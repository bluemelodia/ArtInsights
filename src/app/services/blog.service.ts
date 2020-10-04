import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

import { urlForSite } from '../app.endpoints';
import { Media, UserMediaAction } from '../app.consts';
import { TumblrUserInfo, TumblrResponseData } from '../types/tumblr.types';
import { DeviantData } from '../types/deviant.types';
import { UserResponse } from '../types/shared.types';
import { RedirectService } from './redirect.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  public tumblrUserURL = urlForSite(Media.Tumblr, UserMediaAction.User); 
  private tumblrUserSubject$ = new Subject<TumblrUserInfo>();

  public deviantURL = urlForSite(Media.DeviantArt, UserMediaAction.User); 
  private deviantSubject$ = new Subject<DeviantData>();

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private redirect: RedirectService
  ) { }

  get tumblrUserSub() {
    return this.tumblrUserSubject$.asObservable();
  }

  get deviantSub() {
    return this.deviantSubject$.asObservable();
  }

  getDeviant() {
    this.http.get(this.deviantURL, { withCredentials: true })
      .subscribe((data: UserResponse) => {
        if (data && data.statusCode === 0 && data.responseData) {
          const deviant = data.responseData as DeviantData;
          this.deviantSubject$.next(deviant);
        } else if (data && data.statusCode === 450) {
          /* Keep this here in case the user un-auths mid-session. */
          this.auth.userUnauthForMedia(Media.DeviantArt);
          this.tumblrUserSubject$.next(null);
        } else {
          throw new Error(`Failed to get Deviant.`);
          this.redirect.route('/login');
        }
      }, 
      (error: Error) => {
        this.deviantSubject$.next(null);
      });
  }

  getTumblrUser() {
    this.http.get(this.tumblrUserURL, { withCredentials: true })
      .subscribe((data: UserResponse) => {
        if (data && data.statusCode === 0 && data.responseData) {
          const tumblrUser = data.responseData as TumblrResponseData;
          this.tumblrUserSubject$.next(tumblrUser.user);
        } else if (data && data.statusCode === 450) {
          /* Keep this here in case the user un-auths mid-session. */
          this.auth.userUnauthForMedia(Media.Tumblr);
          this.tumblrUserSubject$.next(null);
        } else {
          this.redirect.route('/login');
        }
      }, 
      (error: Error) => {
        this.tumblrUserSubject$.next(null);
      });
  }
}
