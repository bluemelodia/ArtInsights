import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { media, userAction } from './app.consts';
import { urlForSite } from './app.endpoints';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public tumblrAuthURL = urlForSite(media.Tumblr, userAction.Auth);
  private authRedirectSubject$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  public get redirectSubject$() {
    return this.authRedirectSubject$;
  }

  authenticateUser(socialMedia: media) {
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
        return this.authRedirectSubject$.next(null);
      });
  }

  showAuthorizationPage(socialMedia: media): Observable<any> {
    switch (socialMedia) {
      case media.Tumblr:
        console.log("📘 Initiate Tumblr authentication: ", this.tumblrAuthURL);
        return this.http.get(
            this.tumblrAuthURL,
            {responseType: 'text'});
      default:
        break;
    }
  }
}
