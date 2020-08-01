import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { media, mediaData } from '../app.consts';
import { Subject } from 'rxjs';
import { RedirectService } from '../redirect.service';
import { UtilsService } from '../utils.service';
import { authMediaData, AuthPostResponse, AuthStatus } from './auth.types';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  public mediaData = Object.assign({}, mediaData);
  private authOutcomeSubject$: Subject<AuthPostResponse>;
  private tumblrAuthRedirectSubject$: Subject<string>;
  private daAuthRedirectSubject$: Subject<string>;

  public isAuthorized = false;
  private userAuthForMedia(mediaType: media, status: AuthStatus) {
    console.log("user auth for media: ", mediaType);
    switch(mediaType) {
      case media.DeviantArt:
      case media.Tumblr:
        this.authStatus[mediaType] = status;
        this.isAuthorized = true;
        break;
      default:
        break;
    }
  }
  public authStatus = {
    [media.DeviantArt]: AuthStatus.Unattempted,
    [media.Tumblr]: AuthStatus.Unattempted
  };

  constructor(
    private authService: AuthService, 
    private redirectService: RedirectService,
    private utils: UtilsService
  ) {
    this.setupRedirectSubscriptions();

    /* We don't need Twitter auth as we are only going to be accessing public data. */
    delete this.mediaData[media.Twitter];
  }

  public auth(forMedia: media) {
    this.authService.authenticateUser(forMedia);
  }

  public getIconName(iconName: string) {
    return this.utils.getIconPath(iconName);
  }

  public getStylesForMediaButton(media: media) {
    switch (this.authStatus[media]) {
      case AuthStatus.Unattempted:
      case AuthStatus.Success:
      case AuthStatus.Failed:
        const authStatus = this.authStatus[media];
        return this.getIconName(authMediaData[authStatus].iconName);
      default:
        return '';
    }
  }

  public setupRedirectSubscriptions() {
    this.tumblrAuthRedirectSubject$ = this.authService.redirectSubject$(media.Tumblr);
    this.tumblrAuthRedirectSubject$
      .subscribe((redirectLink) => {
        console.log("Tumblr: Prepare to redirect to auth link: ", redirectLink);
        this.redirectService.redirect(redirectLink);
    });

    this.daAuthRedirectSubject$ = this.authService.redirectSubject$(media.DeviantArt);
    this.daAuthRedirectSubject$
      .subscribe((redirectLink) => {
        console.log("DeviantArt: Prepare to redirect to auth link: ", redirectLink);
        this.redirectService.redirect(redirectLink);
    });
  }

  public setupAuthSubscription() {
    this.authOutcomeSubject$ = this.authService.authOutcomeSubject$;
    this.authOutcomeSubject$
      .subscribe((response: AuthPostResponse) => {
        if (response && response.statusCode === 0) {
          console.log("Auth succesful for ", response);
          this.userAuthForMedia(response.mediaType, AuthStatus.Success);
        } else {
          console.log("Auth failed for: ", response);
          this.userAuthForMedia(response.mediaType, AuthStatus.Failed);
        }
      });
  }
}
