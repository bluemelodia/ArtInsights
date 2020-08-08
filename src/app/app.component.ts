import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Environment } from './app.consts';

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

  constructor(
      private auth: AuthService, 
      public router: Router
  ) {
    /* Condtionally apply styles to the body depending on our environment. */
    if (ENVIRONMENT === Environment.Production) {
      console.log("SET ATTRIBUTE");
      document.body.setAttribute('background-image', './images/login.png');
    } else {
      console.log("NOT PROD!!!!");
    }

    /* Conditionally apply styles to the body depending on which route we are in. */
    router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        document.body.className = router.url === '/login' ? 'full-width' : '';
      }
    });
  }
}
