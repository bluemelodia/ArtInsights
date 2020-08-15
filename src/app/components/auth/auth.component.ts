import { Component } from '@angular/core';
import { Media, mediaData, AlertType, DeviantArtOAuthKey, TumblrOAuthKey } from '../../app.consts';
import { authMediaData, AuthPostResponse, AuthStatus } from './auth.types';
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
  private authRedirectSubject$: Subject<string>;

  public isAuthorized = false;
  private userAuthForMedia(mediaType: Media, status: AuthStatus) {
    switch(mediaType) {
      case Media.DeviantArt:
      case Media.Tumblr:
        if (status === AuthStatus.Success) {
          this.localStorageService.setOAuthKey(mediaType, AuthStatus.Success);
        }
        break;
      default:
        break;
    }
  }



  constructor(
    private alertService: AlertService,
    private authService: AuthService, 
    private localStorageService: LocalStorageService,
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
    if (this.localStorageService.isUserAuth()) {
      this.router.navigateByUrl('/home');
    }
  }

  public getIconName(iconName: string) {
    return this.utils.getImagePath(iconName);
  }

  public getStylesForMediaButton(media: Media) {
    let mediaStyle = [];
    if (this.localStorageService.oAuthStatusForMedia(media)) {
      mediaStyle.push('auth-success');
    }

    return mediaStyle.join(" ");
  }

  public getIconForMediaButton(media: Media) {
    const oAuthStatus = this.localStorageService.oAuthStatusForMedia(media);
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
