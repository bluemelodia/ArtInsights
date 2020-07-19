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
  private tumblrRedirectSubject$ = new Subject<string>();
 
  public deviantArtAuthURL = urlForSite(media.DeviantArt, userAction.Auth);
  private daRedirectSubject$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  public redirectSubject$(socialMedia: media) {
    switch (socialMedia) {
      case media.DeviantArt:
        return this.daRedirectSubject$;
      case media.Tumblr:
        return this.tumblrRedirectSubject$;
    }
  }

  authenticateUser(socialMedia: media) {
    console.log("Authenticate the user: ", socialMedia);

    this.showAuthorizationPage(socialMedia)
      .subscribe((data: string) => {
        if (data) {
          console.log("Prepare to redirect: ", data);
          this.redirectSubject$(socialMedia).next(data);
        } else {
          throw new Error(`Unable to authenticate the user for ${socialMedia}.`);
        }
      }, 
      (error: Error) => {
        this.redirectSubject$(socialMedia).next(null);
      });
  }

  showAuthorizationPage(socialMedia: media): Observable<any> {
    switch (socialMedia) {
      case media.DeviantArt:
        console.log("📘 Initiate DeviantArt authentication: ", this.deviantArtAuthURL);
        return this.http.get(this.deviantArtAuthURL,
          {responseType: 'text'});
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
