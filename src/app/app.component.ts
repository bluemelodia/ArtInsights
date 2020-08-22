import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Environment } from './app.consts';
import { LoginService } from './services/login.service';

declare const ENVIRONMENT: Environment;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ArtInsights';

  @HostListener('window:message', ['$event'])
  receivedPostedMessage(event: any) {
    console.log("Received a message: ", event);
    if (event.origin !== 'https://artinsights.ue.r.appspot.com') {
      return;
    }
    console.log("Auth passed? ", event.data);
    this.auth.authSuccess(event.data);
  }

  /* Log out the user, clearing local storage when they close the window. */
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any) {
      console.log("Window closing. Log out the user.");
      this.login.logoutUser();
  }

  constructor(
      private auth: AuthService, 
      private login: LoginService,
      public router: Router
  ) {
    /* Condtionally apply styles to the body depending on our environment. */
    if (ENVIRONMENT === Environment.Production) {
      document.body.style.backgroundImage = 'url(./images/login.png)';
    }

    /* Conditionally apply styles to the body depending on which route we are in. */
    router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        document.body.className = router.url === '/login' || router.url === '/auth' ? 'full-width' : '';
      }
    });

    /* Wipe old local storage cookies. */
    this.login.newSession();
  }
}
