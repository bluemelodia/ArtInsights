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
    console.log("Authenticate the user: ", socialMedia);
    this.showAuthorizationPage(socialMedia)
      .subscribe((data) => {
        if (data !== -1) {
          console.log("Prepare to redirect: ", data);
        }
      })
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
