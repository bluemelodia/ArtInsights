import { Injectable } from '@angular/core';
import { urlForSite } from '../app.endpoints';
import { Media, UserMediaAction, AlertType } from '../app.consts';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { TumblrUserInfo, TumblrUserResponse } from '../types/tumblr.types';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  public tumblrUserURL = urlForSite(Media.Tumblr, UserMediaAction.User); 
  private tumblrUserSubject$ = new Subject<TumblrUserInfo>();

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  get tumblrUserSub$() {
    return this.tumblrUserSubject$;
  }

  getTumblrUser() {
    this.http.get(this.tumblrUserURL, { withCredentials: true })
      .subscribe((data: TumblrUserResponse) => {
        console.log("RECEIVED USER DATA: ", data);
        if (data && data.statusCode === 0 && data.responseData) {
          console.log("Send tumblr user: ", data.responseData.user);
          this.tumblrUserSubject$.next(data.responseData.user);
        } else if (data && data.statusCode === 450) {
          /* Keep this here in case the user un-auths mid-session. */
          this.auth.redirectToAuthWithAlertMsg('Failed to get user information. Please grant access to your Tumblr account.');
          this.tumblrUserSubject$.next(null);
        } else {
          throw new Error(`Failed to get Tumblr user.`);
        }
      }, 
      (error: Error) => {
        console.log("ERROR: ", error);
        this.tumblrUserSubject$.next(null);
      });
  }
}
