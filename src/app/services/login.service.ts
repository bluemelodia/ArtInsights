import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAction } from '../app.consts';
import { urlForAction } from '../app.endpoints';
import { Observable, of, Subject } from 'rxjs';
import { LoginPostResponse } from '../components/auth/auth.types';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /* For user login and registration. */
  public loginURL = urlForAction(UserAction.Login);
  public registerURL = urlForAction(UserAction.Register);
  private userLoginSubject$ = new Subject<LoginPostResponse>();

  constructor(private http: HttpClient) { }

  public registerUser(username: string, password: string) {
    console.log("Register user: ", username, password);
    this.loginOrRegisterUser(UserAction.Register, { username: username, password: password});
  }

  public loginUser(username: string, password: string) {
    console.log("Login user: ", username, password);
    this.loginOrRegisterUser(UserAction.Login, { username: username, password: password});
  }

  public get loginSubject$() {
    return this.userLoginSubject$;
  }

  private loginOrRegisterUser(userAction: UserAction, body: any) {
    const url = userAction === UserAction.Register ? this.registerURL : this.loginURL;
    this.http.post(url, body)
      .subscribe((data: LoginPostResponse) => {
        if (data) {
          data.userAction = userAction;
          console.log("Action Succeeded: ", data);
          this.userLoginSubject$.next(data);
        } else {
          throw new Error(`Login or registration failed.`);
        }
      }, 
      (error: Error) => {
        console.log("ERROR: ", error);
        this.userLoginSubject$.next(null);
      });
  }
}