import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { timer, Subscription, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AlertService } from '../../services/alert.service';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { DeviantData, DeviantFriend, DeviantListData, DeviantWatcher, WatchResponse } from '../../types/deviant.types';
import { AlertType, Media } from '../../app.consts';
import { DeviantArtFollowService } from '../../services/deviant-art-follow.service';
import { UserResponse, Engagement } from '../../types/shared.types';
import { PostService } from '../../services/post.service';
import { DeviantArtPostResponse, Deviation, DeviantTag } from '../../types/post.types';
import { UtilsService } from '../../services/utils.service';
import { StatService } from '../../services/stat.service';
import { DeviationAnalytics } from '../../types/tag.types';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-deviantart',
  templateUrl: './deviantart.component.html',
  styleUrls: ['./deviantart.component.scss']
})
export class DeviantArtComponent implements OnInit {
  constructor(
    private alert: AlertService,
    private analytics: AnalyticsService,
    private auth: AuthService,
    private blog: BlogService,
    private post: PostService,
    private deviantFollow: DeviantArtFollowService,
    private stat: StatService,
    private utils: UtilsService,
    private router: Router
  ) {
    this.setupDASubscription();
    this.routeObserver = this.router.events
      .pipe(takeUntil(this.destroyed$))
      .subscribe(event => {
        console.log("Nav ending, should we get DeviantArt user? ", event);
        if (event instanceof NavigationEnd && event.url === "/home/deviant-art"){
          console.log("Nav ending, get Deviant: ", event);
          this.blog.getDeviant();
        }
      });
  }

  private routeObserver: Subscription;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  public deviant: DeviantData;
  public deviations: Deviation[] = [];
  public deviationStats: DeviationAnalytics;
  private deviantUserSubject$ = this.blog.deviantSub$;

  public watchers: string[] = [];
  public watchersMap: { [user: string] : any } = {};
  private watcherOffset = 0;
  private hasMoreWatchers = true;

  public friends: string[] = [];
  public friendsMap: { [user: string] : any } = {};
  private friendOffset = 0;
  private hasMoreFriends = true;

  public commentStatsDA: Engagement;
  public faveStatsDA: Engagement;

  ngOnInit() {}

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  /* Since there can only be one DA user, as soon as the user info is received, 
   * we can make the get watches call. */
  public setupDASubscription() {
    this.deviantUserSubject$
      .subscribe((deviant: DeviantData) => {
        console.log("Received DA user: ", deviant);
        this.deviant = deviant;
        this.getWatchersAndFriends();
        this.getDeviations();
      });

    this.stat.commentSubject$(Media.DeviantArt)
      .subscribe((commentStats: Engagement) => {
        this.commentStatsDA = commentStats;
    });
  
    this.stat.favoriteSubject$(Media.DeviantArt)
      .subscribe((faveStats: Engagement) => {
        this.faveStatsDA = faveStats;
    });
  }

  public getDeviations() {
    this.deviations = [];
    this.commentStatsDA = null;
    this.faveStatsDA = null;

    this.post.getDeviations(this.deviant.username)
      .subscribe((deviations: UserResponse) => {
        console.log("Deviations: ", deviations);
        if (deviations.statusCode === 0 
          && deviations.responseData) {
            const deviationData = deviations.responseData as DeviantArtPostResponse;
            const deviationMap = {};
            if (deviationData.deviations && deviationData.deviations.length > 0) {
              /* Make a dictionary for easier parsing. */
              deviationData.deviations.forEach((deviation: Deviation) => {
                deviationMap[deviation.deviationid] = deviation;
              });
            }
            if (deviationData.metadata && deviationData.metadata.length > 0) {
              deviationData.metadata.forEach((deviation) => { 
                const tagArr: string[] = [];

                /* Simply tag structure so it's easier to iterate through in the template. */
                deviation.tags.forEach((tag: DeviantTag) => {
                  tagArr.push(tag.tag_name);
                })
                deviation.tags = tagArr;
                deviation.description = this.utils.stripLinks(deviation.description);

                if (deviationMap[deviation.deviationid]) {
                  const deviationData = deviationMap[deviation.deviationid];
                  deviation.category = deviationData.category;
                  deviation.category_path = deviationData.category_path;
                  deviation.content = deviationData.content; 
                  deviation.published_time = deviationData.published_time;
                  deviation.url = deviationData.url; 
                }
                this.deviations.push(deviation);
              });
            }
            console.log("Deviations: ", this.deviations);
            this.stat.calculateDeviationStats(this.deviations);
            this.analytics.analyzeDeviations(this.deviations);
        }
      });
  }

  public getWatchersAndFriends() {
    if (this.deviant) {
      /* Reset stats. */
      this.resetDAStats();

      this.alert.showAlert(AlertType.Info, `Retrieving watchers and friends list for ${this.deviant.username}...`);
      this.getFriends();
      this.getWatchers();
    }
  }

  private resetDAStats() {
    this.watchers = [];
    this.watchersMap = {};
    this.watcherOffset = 0;
    this.hasMoreWatchers = true;

    this.friends = [];
    this.friendsMap = {};
    this.friendOffset = 0;
    this.hasMoreFriends = true;
  }

  public getFriends($event?: Event) {
    console.log("Get more friends: ", this.friendOffset);
    if (this.hasMoreFriends) {
      console.log("WE have more friends! Get them: ");
      this.getDAFriendsList(++this.friendOffset);
    }
  }

  public getWatchers($event?: Event) {
    console.log("Get more watchers: ", this.watcherOffset);
    if (this.hasMoreWatchers) {
      console.log("WE have more watchers! Get them: ");
      this.getDAFollowers(++this.watcherOffset);
    }
  }

  public getDAFriendsList(offset: number = 0) {
    console.log("GET MORE FRIENDS!", offset);
    this.deviantFollow.getDAFriendsList(this.deviant.username, offset)
    .subscribe((friendData: UserResponse) => { 
      if (friendData.statusCode === 450) {
        this.auth.userUnauthForMedia(Media.DeviantArt);
      } else if (friendData.statusCode === -1) {
        this.alert.showAlert(AlertType.Error, `Unable to fetch friends list at this time. Try again later.`);
        console.log(`Failed to fetch friends list.`);
      } else {
        console.log("Friends: ", friendData);
        const responseData = friendData.responseData as DeviantListData;
        if (!responseData.has_more || responseData.results.length < 1) {
          this.hasMoreFriends = false;
        }
        responseData.results.forEach((friend: DeviantFriend) => {
          this.addFriend(friend);
        });
        console.log("Friends so far: ", this.watchers);
      }
    })
  }

  public getDAFollowers(offset: number = 0) {
    console.log("GET MORE WATCHERS!", offset);
    this.deviantFollow.getDAWatchers(this.deviant.username, offset)
      .subscribe((watcherData: UserResponse) => { 
        if (watcherData.statusCode === 450) {
          this.auth.userUnauthForMedia(Media.DeviantArt);
        } else if (watcherData.statusCode === -1) {
          this.alert.showAlert(AlertType.Error, `Unable to fetch watchers list at this time. Try again later.`);
          console.log(`Failed to fetch watchers list.`);
        } else  {
          console.log("Watchers: ", watcherData);
          const responseData = watcherData.responseData as DeviantListData;
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
      this.watchers.push(watcher.user.username);
      this.watchersMap[watcher.user.username] = watcher;
    }
  }

  public addFriend(friend: DeviantFriend) {
    if (friend.user && friend.user.username) {
      this.friends.push(friend.user.username);
      this.friendsMap[friend.user.username] = friend;
    }
  }

  public followDeviant(deviant: string) {
    this.deviantFollow.watch(deviant)
    .subscribe((res: WatchResponse) => {
      console.log("FOLLOW RES: ", res);
      if (res.statusCode === 403) {
        this.auth.userUnauthForMedia(Media.DeviantArt);
      } else if (res.statusCode !== 0 || res.responseData.status === 'error') {
        this.alert.showAlert(AlertType.Error, `Unable to watch ${deviant}.`);
        console.log(`Failed to watch: ${deviant}, ${res}`);
      } else {
        this.alert.showAlert(AlertType.Success, `You followed ${deviant}.`);
        console.log(`Successfully followed: ${deviant}, refresh`);
        timer(1000).subscribe(() => {
          this.getWatchersAndFriends();
        });
      }
      console.log("Try to watch: ", res);
    })
  }

  public unfollowDeviant(deviant: string) {
    this.deviantFollow.unwatch(deviant)
    .subscribe((res: WatchResponse) => {
      console.log("UNFOLLOW RES: ", res);
      if (res.statusCode === 403) {
        this.auth.userUnauthForMedia(Media.DeviantArt);
      } else if (res.statusCode !== 0 || res.responseData.status === 'error') {
        console.log(`Failed to unwatch: ${deviant}, `, res);
        this.alert.showAlert(AlertType.Error, `Unable to unwatch ${deviant}.`);
      } else {
        console.log(`Successfully unwatched: ${deviant}, refresh`);
        this.alert.showAlert(AlertType.Success, `You unwatched ${deviant}.`);

        timer(1000).subscribe(() => {
          this.getWatchersAndFriends();
        });
      }
      console.log("Try to unwatch: ", res);
    })  
  }
}

