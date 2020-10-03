import { Component, OnInit } from '@angular/core';
import { mediaData, navActions, Media } from '../../app.consts';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { AuthStatus } from '../auth/auth.types';
import { Observable } from 'rxjs';

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

  private TumblrOAuth$: Observable<AuthStatus> = this.storage.tumblrOAuth$();
  private DeviantArtOAuth$: Observable<AuthStatus> = this.storage.deviantArtOAuth$();

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
      this.TumblrOAuth$.subscribe((tumblrStatus: AuthStatus) => {
        this.mediaStatus[Media.Tumblr] = tumblrStatus;
        console.log("🎯 Tumblr status: ", this.mediaStatus);
      });

      this.DeviantArtOAuth$.subscribe((deviantArtStatus: AuthStatus) => {
        this.mediaStatus[Media.DeviantArt] = deviantArtStatus;
        console.log("🎯 DeviantArt status: ", this.mediaStatus);
      });

      this.mediaStatus[Media.Twitter] = AuthStatus.Success;
      console.log("🎯 Media status: ", this.mediaStatus);
  }
}
