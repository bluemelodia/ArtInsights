import { Component, ViewChild, ElementRef } from '@angular/core';
import { Media, mediaData, AlertType } from '../../app.consts';
import { authMediaData, AuthPostResponse, AuthStatus, AuthRedirectResponse } from './auth.types';
import { AuthService } from '../../services/auth.service';
import { RedirectService } from '../../services/redirect.service';
import { UtilsService } from '../../services/utils.service';
import { Observable, ReplaySubject, Subscription, interval } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { Router, NavigationEnd } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { LoadingService } from '../../services/loading.service';
import { takeUntil } from 'rxjs/operators';
import { PlatformService } from '../../services/platform.service';
import { Platform } from '../../types/platform.types';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  public mediaData = Object.assign({}, mediaData);
  private auth$: Observable<AuthPostResponse>;
  private authRedirect$: Observable<AuthRedirectResponse>;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private routeObserver: Subscription;

  @ViewChild('tabOpener', {static: false}) tabOpener: ElementRef;

  constructor(
    private alert: AlertService,
    public auth: AuthService, 
    private loading: LoadingService,
    private platform: PlatformService,
    private storage: LocalStorageService,
    private redirect: RedirectService,
    private router: Router,
    private utils: UtilsService
  ) {
    this.setupRedirectSubscriptions();
    this.setupAuthSubscription();

    this.routeObserver = this.router.events
      .pipe(takeUntil(this.destroyed$))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (event.url === "/auth") {
            this.loading.hideLoader();
          } 
        }
    });

    /* We don't need Twitter auth as we are only going to be accessing public data. */
    delete this.mediaData[Media.Twitter];
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public authUser(forMedia: Media) {
    this.auth.authenticateUser(forMedia);
  }

  public unauthUser(forMedia: Media) {
    this.auth.unauthenticateUser(forMedia);
  }

  public loginUser() {
    if (this.storage.isUserAuth()) {
      this.redirect.route('/home');
    }
  }

  public getIconName(iconName: string) {
    return this.utils.getImagePath(iconName);
  }

  public getStylesForMediaButton(media: Media) {
    let mediaStyle = [];
    if (this.auth.isAuthorizedForMedia(media)) {
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
    this.authRedirect$ = this.auth.authRedirect$;
    this.authRedirect$
      .subscribe((redirectLink: AuthRedirectResponse) => {
        if (redirectLink.redirect) {
          this.alert.showAlert(AlertType.Info, `Connecting to ${redirectLink.mediaType}...`);
          this.redirect.redirect(redirectLink.redirect);
          this.setupClickListener(redirectLink.redirect);
        } else {
          this.alert.showAlert(AlertType.Error, `We are unable to connect to ${redirectLink.mediaType} at this time. Please try again later.`);
        }
    });
  }

  public setupClickListener(redirectLink: string) {
    if (!this.platform.isSafariOrFirefoxMobile()) {
      console.log("==> Chome, or SAFARI OR FIREFOX DESKTOP");
      alert("CHROME, SAFARI OR FIREFOX DESKTOP");
      return;
    }

    console.log("SAFARI OR FIREFOX MOBILE");
    alert("SAFARI OR FIREFOX MOBILE");
    /* 
    * This is needed to get the window opening functionality to work on mobile Safari.
    * For click events on Safari to work, the listener has to be directly attached to the
    * element. Remove the event listener after click to avoid adding multiple listeners.
    */
    var clickListener = () => { 
      window.open(redirectLink);
      alert("WINDOW OPEN");
    };
    this.tabOpener.nativeElement.addEventListener('click', clickListener);
      setTimeout(() => {
          alert("NATIVE ELEMENT: " + this.tabOpener.nativeElement);
          this.tabOpener.nativeElement.click();
      }, 0);
      setTimeout(() => {
        alert("REMOVE THE CLICK LISTENER");
        this.tabOpener.nativeElement.removeEventListener('click', clickListener);
      }, 3000);
  }

  public setupAuthSubscription() {
    this.auth$ = this.auth.auth$;
    this.auth$
      .subscribe((response: AuthPostResponse) => {
        if (response && response.statusCode === 0) {
          console.info("Auth successful for ", response);
          this.alert.showAlert(AlertType.Success, `${response.mediaType} authorization successful.`);
          this.storage.setOAuthKey(response.mediaType, AuthStatus.Success);
        } else {
          console.info("Auth failed for: ", response);
          this.alert.showAlert(AlertType.Error, `${response.mediaType} authorization failed. Please try again.`);
          this.storage.setOAuthKey(response.mediaType, AuthStatus.Failed);
        }
      });
  }
}
