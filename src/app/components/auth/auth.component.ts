import { Component } from '@angular/core';
import { Media, mediaData, AlertType } from '../../app.consts';
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
  private authSubject$: Subject<AuthPostResponse>;
  private authRedirectSubject$: Subject<string>;

  public isAuthorized = false;
  private userAuthForMedia(mediaType: Media, status: AuthStatus) {
    switch(mediaType) {
      case Media.DeviantArt:
      case Media.Tumblr:
        this.authStatus[mediaType] = status;
        this.isAuthorized = status === AuthStatus.Success;
        break;
      default:
        break;
    }
  }
  public authStatus = {
    [Media.DeviantArt]: AuthStatus.Unattempted,
    [Media.Tumblr]: AuthStatus.Unattempted
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
    delete this.mediaData[Media.Twitter];
  }

  public auth(forMedia: Media) {
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

  public getStylesForMediaButton(Media: Media) {
    let mediaStyle = [];
    switch (this.authStatus[Media]) {
      case AuthStatus.Success:
        mediaStyle.push('auth-success');
        break;
    }

    return mediaStyle.join(" ");
  }

  public getIconForMediaButton(Media: Media) {
    switch (this.authStatus[Media]) {
      case AuthStatus.Unattempted:
      case AuthStatus.Success:
      case AuthStatus.Failed:
        const authStatus = this.authStatus[Media];
        return this.getIconName(authMediaData[authStatus].iconName);
      default:
        return '';
    }
  }

  public setupRedirectSubscriptions() {
    this.authRedirectSubject$ = this.authService.authRedirectSubject$;
    this.authRedirectSubject$
      .subscribe((redirectLink) => {
        console.info("Prepare to redirect to auth link: ", redirectLink);
        this.alertService.showAlert(AlertType.Info, 'Connecting to Tumblr...');
        this.redirectService.redirect(redirectLink);
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
}
