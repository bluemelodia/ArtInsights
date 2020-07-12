import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { media, userAction } from './app.consts';
import { urlForSite } from './app.endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public tumblrAuthURL = urlForSite(media.Tumblr, userAction.Auth);

  constructor(private http: HttpClient) { }

  authenticateUser(socialMedia: media) {
    this.showAuthorizationPage(socialMedia)
    .subscribe((data) => {
      if (data !== -1) {
        console.log("Prepare to redirect: ", data);
      }
    })
  }


  showAuthorizationPage(socialMedia: media): Observable<any> {
    let authURL;
    switch (socialMedia) {
      case media.Tumblr:
        console.log("📘 Initiate Tumblr authentication: ", this.tumblrAuthURL);
        return this.http.get(this.tumblrAuthURL);
      default:
        break;
    }
    return authURL;
  }
}
