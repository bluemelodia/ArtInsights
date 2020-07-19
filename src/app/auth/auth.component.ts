import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../auth.service';
import { media } from '../app.consts';
import { Subject } from 'rxjs';
import { RedirectService } from '../redirect.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @HostListener('message', ['$event'])
  receivedPostedMessage(event: any) {
    console.log("Received a message: ", event);
    if (event.origin !== 'https://artinsights.ue.r.appspot.com') {
      return;
    }
    console.log("Auth passed? ");
  }

  private tumblrAuthRedirectSubject$: Subject<string>;
  private daAuthRedirectSubject$: Subject<string>;

  constructor(
    private authService: AuthService, 
    private redirectService: RedirectService
  ) {
    this.setupRedirectSubscriptions();
  }

  public ngOnInit() {

  }

  public auth() {
    console.log("AUTH");
    this.authService.authenticateUser(media.DeviantArt);
  }

  public setupRedirectSubscriptions() {
    this.tumblrAuthRedirectSubject$ = this.authService.redirectSubject$(media.Tumblr);
    this.tumblrAuthRedirectSubject$
      .subscribe((redirectLink) => {
        console.log("Prepare to redirect to auth link: ", redirectLink);
        this.redirectService.redirect(redirectLink);
    });

    this.daAuthRedirectSubject$ = this.authService.redirectSubject$(media.DeviantArt);
    this.daAuthRedirectSubject$
      .subscribe((redirectLink) => {
        console.log("Prepare to redirect to auth link: ", redirectLink);
        this.redirectService.redirect(redirectLink);
    });
  }
}
