import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Environment } from './app.consts';
import { ReplaySubject, Subscription, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadingService } from './services/loading.service';

declare const ENVIRONMENT: Environment;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ArtInsights';
  showLoader = false;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private loader$: Observable<boolean> = this.loader.loadingSubscriber$;
  private routeObserver: Subscription;

  @HostListener('window:message', ['$event'])
  receivedPostedMessage(event: any) {
    if (event.origin !== 'https://artinsights.ue.r.appspot.com') {
      return;
    }
    this.auth.authSuccess(event.data);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  constructor(
      private auth: AuthService, 
      public router: Router,
      public loader: LoadingService
  ) {
    /* Condtionally apply styles to the body depending on our environment. */
    if (ENVIRONMENT === Environment.Production) {
      document.body.style.backgroundImage = 'url(./images/login.png)';
    }

    this.routeObserver = this.router.events
    .pipe(takeUntil(this.destroyed$))
    .subscribe(event => {
      if (event instanceof NavigationEnd) { 
        /* Conditionally apply styles to the body depending on which route we are in. */
        document.body.className = router.url === '/login' || router.url === '/auth' ? 'full-width' : '';
    
        if (event.url !== "/login" && event.urlAfterRedirects !== "/login") {
          /* Check local storage and re-enable the nav buttons. */
          console.log("Refresh auth statuses!");
          this.auth.refreshAuthStatuses();
        } 
      }
    });

    this.loader$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(showLoader => {
        this.showLoader = showLoader;
      });

    /* Wipe old local storage cookies. */
    // this.login.newSession();
  }
}
