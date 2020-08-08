import { Component } from '@angular/core';
import { media, mediaData, alertType } from '../../app.consts';
import { authMediaData, AuthPostResponse, AuthStatus } from './auth.types';
import { AuthService } from '../../services/auth.service';
import { RedirectService } from '../../services/redirect.service';
import { UtilsService } from '../../services/utils.service';
import { Subject } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

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
    switch(mediaType) {
      case media.DeviantArt:
      case media.Tumblr:
        this.authStatus[mediaType] = status;
        this.isAuthorized = status === AuthStatus.Success;
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
    private alertService: AlertService,
    private authService: AuthService, 
    private redirectService: RedirectService,
    private router: Router,
    private utils: UtilsService
  ) {
    this.setupRedirectSubscriptions();
    this.setupAuthSubscription();

    /* We don't need Twitter auth as we are only going to be accessing public data. */
    delete this.mediaData[media.Twitter];
  }

  public auth(forMedia: media) {
    this.authService.authenticateUser(forMedia);
  }

  public loginUser() {
    if (this.isAuthorized) {
      this.router.navigate['home'];
    }
  }

  public getIconName(iconName: string) {
    return this.utils.getImagePath(iconName);
  }

  public getStylesForMediaButton(media: media) {
    let mediaStyle = [];
    switch (this.authStatus[media]) {
      case AuthStatus.Success:
        mediaStyle.push('auth-success');
        break;
    }

    return mediaStyle.join(" ");
  }

  public getIconForMediaButton(media: media) {
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
        console.info("Tumblr: Prepare to redirect to auth link: ", redirectLink);
        this.alertService.showAlert(alertType.Info, 'Connecting to Tumblr...');
        this.redirectService.redirect(redirectLink);
    });

    this.daAuthRedirectSubject$ = this.authService.redirectSubject$(media.DeviantArt);
    this.daAuthRedirectSubject$
      .subscribe((redirectLink) => {
        console.info("DeviantArt: Prepare to redirect to auth link: ", redirectLink);
        this.alertService.showAlert(alertType.Info, 'Connecting to DeviantArt...');
        this.redirectService.redirect(redirectLink);
    });
  }

  public setupAuthSubscription() {
    this.authOutcomeSubject$ = this.authService.authOutcomeSubject$;
    this.authOutcomeSubject$
      .subscribe((response: AuthPostResponse) => {
        if (response && response.statusCode === 0) {
          console.info("Auth successful for ", response);
          this.alertService.showAlert(alertType.Success, `${response.mediaType} authorization successful.`);
          this.userAuthForMedia(response.mediaType, AuthStatus.Success);
        } else {
          console.info("Auth failed for: ", response);
          this.alertService.showAlert(alertType.Error, `${response.mediaType} authorization failed. Please try again.`);
          this.userAuthForMedia(response.mediaType, AuthStatus.Failed);
        }
      });
  }
}
