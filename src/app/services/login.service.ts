import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAction, AuthTokenKey } from '../app.consts';
import { urlForAction } from '../app.endpoints';
import { Observable, of, Subject } from 'rxjs';
import { LoginPostResponse } from '../components/auth/auth.types';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { RedirectService } from './redirect.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /* For user login and registration. */
  public loginURL = urlForAction(UserAction.Login);
  public registerURL = urlForAction(UserAction.Register);
  private userLoginSubject$ = new Subject<LoginPostResponse>();

  constructor(
      private http: HttpClient,
      private router: Router,
      private storage: LocalStorageService,
      private redirect: RedirectService
  ) { }

  public userNotAuthorizedToLogin() {
    this.redirect.route('/login');
  }

  public registerUser(username: string, password: string) {
    this.loginOrRegisterUser(UserAction.Register, { username: username, password: password});
  }

  public loginUser(username: string, password: string) {
    this.loginOrRegisterUser(UserAction.Login, { username: username, password: password});
  }

  public newSession() {
    this.logoutUser();
  }

  public logoutUser() {
    this.storage.resetKeys();
  }

  public get login$() {
    return this.userLoginSubject$.asObservable();
  }

  private loginOrRegisterUser(userAction: UserAction, body: any) {
    const url = userAction === UserAction.Register ? this.registerURL : this.loginURL;
    this.http.post(url, body, { withCredentials: true })
      .subscribe((data: LoginPostResponse) => {
        if (data) {
          data.userAction = userAction;
          if (userAction === UserAction.Login) {
            this.storage.storeAuthToken(data.responseData);
          }
          this.userLoginSubject$.next(data);
        } else {
          throw new Error(`Login or registration failed.`);
        }
      }, 
      (error: Error) => {
        this.userLoginSubject$.next(null);
      });
  }
}