import { Component } from '@angular/core';
import { Media, mediaData, AlertType } from '../../app.consts';
import { authMediaData, AuthPostResponse, AuthStatus, AuthRedirectResponse } from './auth.types';
import { AuthService } from '../../services/auth.service';
import { RedirectService } from '../../services/redirect.service';
import { UtilsService } from '../../services/utils.service';
import { Subject } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  public mediaData = Object.assign({}, mediaData);
  private authSubject$: Subject<AuthPostResponse>;
  private authRedirectSubject$: Subject<AuthRedirectResponse>;

  constructor(
    private alertService: AlertService,
    public authService: AuthService, 
    private storage: LocalStorageService,
    private redirectService: RedirectService,
    private router: Router,
    private utils: UtilsService
  ) {
    this.setupRedirectSubscriptions();
    this.setupAuthSubscription();

    /* We don't need Twitter auth as we are only going to be accessing public data. */
    delete this.mediaData[Media.Twitter];
  }

  public auth(forMedia: Media) {
    this.authService.authenticateUser(forMedia);
  }

  public loginUser() {
    if (this.storage.isUserAuth()) {
      this.router.navigateByUrl('/home');
    }
  }

  public getIconName(iconName: string) {
    return this.utils.getImagePath(iconName);
  }

  public getStylesForMediaButton(media: Media) {
    let mediaStyle = [];
    if (this.authService.isAuthorizedForMedia(media)) {
      mediaStyle.push('auth-success');
    }

    return mediaStyle.join(" ");
  }

  public getIconForMediaButton(media: Media) {
    const oAuthStatus = this.storage.oAuthStatusForMedia(media);
    switch (oAuthStatus) {
      case AuthStatus.Unattempted:
      case AuthStatus.Success:
      case AuthStatus.Failed:
        return this.getIconName(authMediaData[oAuthStatus].iconName);
      default:
        return '';
    }
  }

  public setupRedirectSubscriptions() {
    this.authRedirectSubject$ = this.authService.authRedirectSubject$;
    this.authRedirectSubject$
      .subscribe((redirectLink: AuthRedirectResponse) => {
        console.info("Prepare to redirect to auth link: ", redirectLink);
        if (redirectLink.redirect) {
          this.alertService.showAlert(AlertType.Info, `Connecting to ${redirectLink.mediaType}...`);
          this.redirectService.redirect(redirectLink.redirect);
        } else {
          this.alertService.showAlert(AlertType.Error, `We are unable to connect to ${redirectLink.mediaType} at this time. Please try again later.`);
        }
    });
  }

  public setupAuthSubscription() {
    this.authSubject$ = this.authService.authSubject$;
    this.authSubject$
      .subscribe((response: AuthPostResponse) => {
        if (response && response.statusCode === 0) {
          console.info("Auth successful for ", response);
          this.alertService.showAlert(AlertType.Success, `${response.mediaType} authorization successful.`);
          this.userAuthForMedia(response.mediaType, AuthStatus.Success);
        } else {
          console.info("Auth failed for: ", response);
          this.alertService.showAlert(AlertType.Error, `${response.mediaType} authorization failed. Please try again.`);
          this.userAuthForMedia(response.mediaType, AuthStatus.Failed);
        }
      });
  }

  private userAuthForMedia(mediaType: Media, status: AuthStatus) {
    switch(mediaType) {
      case Media.DeviantArt:
      case Media.Tumblr:
        if (status === AuthStatus.Success) {
          this.storage.setOAuthKey(mediaType, AuthStatus.Success);
        }
        break;
      default:
        break;
    }
  }
}
