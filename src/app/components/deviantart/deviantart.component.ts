import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { DeviantData, DeviantWatchers, DeviantWatcher } from '../../types/deviant.types';
import { AlertType, Media } from '../../app.consts';
import { DeviantArtFollowService } from '../../services/deviant-art-follow.service';
import { UserResponse } from '../../types/shared.types';
import { timer } from 'rxjs';

@Component({
  selector: 'app-deviantart',
  templateUrl: './deviantart.component.html',
  styleUrls: ['./deviantart.component.scss']
})
export class DeviantArtComponent implements OnInit {
  constructor(
    private alertService: AlertService,
    private auth: AuthService,
    private blogService: BlogService,
    private deviantFollowService: DeviantArtFollowService, 
    private router: Router
  ) {
    this.setupDASubscription();

    this.router.events.subscribe(event =>{
      console.log("Nav ending, should we get DeviantArt user? ", event);
      if (event instanceof NavigationEnd && event.url === "/deviant-art"){
        console.log("Nav ending, get Deviant: ", event);
        this.blogService.getDeviant();
      }
   })
  }

  public deviant: DeviantData;
  private deviantUserSubject$ = this.blogService.deviantSub$;

  public watchers: string[] = [];
  public watchersMap: { [user: string] : any } = {};
  private watcherOffset = 0;
  private hasMoreWatchers = true;

  ngOnInit() {
  }

  /* Since there can only be one DA user, as soon as the user info is received, 
   * we can make the get watches call. */
  public setupDASubscription() {
    this.deviantUserSubject$
      .subscribe((deviant: DeviantData) => {
        console.log("Received DA user: ", deviant);
        this.deviant = deviant;
        this.getWatches();
      });
  }

  public getWatches() {
    if (this.deviant) {
      /* Reset stats. */
      this.resetDAStats();

      this.alertService.showAlert(AlertType.Info, `Retrieving data for ${this.deviant.username}...`);
      this.getDAFollowersAndFollowing();
    }
  }

  private resetDAStats() {
    this.watchers = [];
    this.watchersMap = {};
    this.watcherOffset = 0;
    this.hasMoreWatchers = true;
  }

  public userScrolledToBottom() {
    console.log("Get more watchers: ", this.watcherOffset);
    if (this.hasMoreWatchers) {
      console.log("WE have more watchers! Get them: ");
      this.getDAFollowersAndFollowing(++this.watcherOffset);
    }
  }

  public getDAFollowersAndFollowing(offset: number = 0) {
    this.deviantFollowService.getDAFriends(this.deviant.username, offset)
      .subscribe((watcherData: UserResponse) => { 
        if (watcherData.statusCode !== -1) {
          console.log("Watchers: ", watcherData);
          const responseData = watcherData.responseData as DeviantWatchers;
          if (!responseData.has_more || responseData.results.length < 1) {
            this.hasMoreWatchers = false;
          }
          responseData.results.forEach((watcher: DeviantWatcher) => {
            this.addWatcher(watcher);
          });
          console.log("Watchers so far: ", this.watchers);
        }
      })
  }

  public addWatcher(watcher: DeviantWatcher) {
    if (watcher.user && watcher.user.username) {
      console.log("Add watcher: ", watcher, watcher.user.username);
      this.watchers.push(watcher.user.username);
      this.watchersMap[watcher.user.username] = watcher;
    }
  }

  public followDeviant(deviant: string) {
    this.deviantFollowService.watch(deviant)
    .subscribe((res: any) => {
      if (res.statusCode === 403) {
        this.auth.userUnauthForMedia(Media.DeviantArt);
      } else if (res.statusCode !== 0 || res.error_description) {
        this.alertService.showAlert(AlertType.Error, `Unable to watch ${deviant}.`);
        console.log(`Failed to watch: ${deviant}, ${res}`);
      } else {
        this.alertService.showAlert(AlertType.Success, `You followed ${deviant}.`);
        console.log(`Successfully followed: ${deviant}, refresh`);
        timer(1000).subscribe(() => {
          this.getWatches();
        });
      }
      console.log("Try to watch: ", res);
    })
  }

  public unfollowDeviant(deviant: string) {
    this.deviantFollowService.unwatch(deviant)
    .subscribe((res: any) => {
      if (res.statusCode === 403) {
        this.auth.userUnauthForMedia(Media.Tumblr);
      } else if (res.statusCode !== 0 || res.error_description) {
        console.log(`Failed to unwatch: ${deviant}, `, res);
        this.alertService.showAlert(AlertType.Error, `Unable to unwatch ${deviant}.`);
      } else {
        console.log(`Successfully unwatched: ${deviant}, refresh`);
        this.alertService.showAlert(AlertType.Success, `You unwatched ${deviant}.`);

        timer(1000).subscribe(() => {
          this.getWatches();
        });
      }
      console.log("Try to unwatch: ", res);
    })  
  }
}

