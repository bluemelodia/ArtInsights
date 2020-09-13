import { Component, OnInit } from '@angular/core';
import { mediaData, navActions, Media } from '../../app.consts';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { AuthStatus } from '../auth/auth.types';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public mediaData = mediaData;
  public navActions = navActions;
  public authSuccess = AuthStatus.Success;

  public mediaStatus = {};

  private TumblrOAuthSubject$ = this.storage.TumblrOAuthSubject$;
  private DeviantArtOAuthSubject$ = this.storage.DeviantArtOAuthSubject$;

  constructor(
      public auth: AuthService,
      private storage: LocalStorageService) { }

  ngOnInit(): void {
      Object.keys(mediaData).forEach((media) => {
        console.log("Push media status: ", media);
        this.mediaStatus[media] = AuthStatus.Unattempted;
      });

      /* Subscribe to changes in social media auth status, and enable/disable the
       * navigation links accordingly. Twitter is always auth = true as only the 
       * public API is used. */
      this.TumblrOAuthSubject$.subscribe((tumblrStatus: AuthStatus) => {
        this.mediaStatus[Media.Tumblr] = tumblrStatus;
        console.log("🎯 Tumblr status: ", this.mediaStatus);
      });

      this.DeviantArtOAuthSubject$.subscribe((deviantArtStatus: AuthStatus) => {
        this.mediaStatus[Media.DeviantArt] = deviantArtStatus;
        console.log("🎯 DeviantArt status: ", this.mediaStatus);
      });

      this.mediaStatus[Media.Twitter] = AuthStatus.Success;
      console.log("🎯 Media status: ", this.mediaStatus);
  }
}
