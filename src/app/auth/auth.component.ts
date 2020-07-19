import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { media, mediaData } from '../app.consts';
import { Subject } from 'rxjs';
import { RedirectService } from '../redirect.service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  public mediaData = mediaData;
  private tumblrAuthRedirectSubject$: Subject<string>;
  private daAuthRedirectSubject$: Subject<string>;

  constructor(
    private authService: AuthService, 
    private redirectService: RedirectService,
    private utils: UtilsService
  ) {
    this.setupRedirectSubscriptions();
  }

  public auth(forMedia: media) {
    this.authService.authenticateUser(forMedia);
  }

  public getIconName(iconName: string) {
    return this.utils.getIconPath(iconName);
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
}
