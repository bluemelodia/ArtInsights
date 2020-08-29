import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { DeviantData, DeviantFriend, DeviantListData, DeviantWatcher, WatchResponse } from '../../types/deviant.types';
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

  public friends: string[] = [];
  public friendsMap: { [user: string] : any } = {};
  private friendOffset = 0;
  private hasMoreFriends = true;

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
        this.getFriends();
      });
  }

  public getWatches() {
    if (this.deviant) {
      /* Reset stats. */
      this.resetDAStats();

      this.alertService.showAlert(AlertType.Info, `Retrieving watchers for ${this.deviant.username}...`);
      this.getDAFollowers();
    }
  }

  public getFriends() {
    if (this.deviant) {
      /* Reset stats. */
      this.resetDAStats();

      this.alertService.showAlert(AlertType.Info, `Retrieving friends list for ${this.deviant.username}...`);
      this.getDAFriends();
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

  public getDAFriends() {
    console.log("Get more friends: ", this.friendOffset);
    if (this.hasMoreFriends) {
      console.log("WE have more friends! Get them: ");
      this.getDAFriendsList(++this.friendOffset);
    }
  }

  public getDAWatchers() {
    console.log("Get more watchers: ", this.watcherOffset);
    if (this.hasMoreWatchers) {
      console.log("WE have more watchers! Get them: ");
      this.getDAFollowers(++this.watcherOffset);
    }
  }

  public getDAFollowers(offset: number = 0) {
    console.log("GET MORE WATCHERS!", offset);
    this.deviantFollowService.getDAWatchers(this.deviant.username, offset)
      .subscribe((watcherData: UserResponse) => { 
        if (watcherData.statusCode !== -1) {
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

  public getDAFriendsList(offset: number = 0) {
    console.log("GET MORE FRIENDS!", offset);
    this.deviantFollowService.getDAFriends(this.deviant.username, offset)
    .subscribe((friendData: UserResponse) => { 
      if (friendData.statusCode !== -1) {
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

  public addWatcher(watcher: DeviantWatcher) {
    if (watcher.user && watcher.user.username) {
      console.log("Add watcher: ", watcher, watcher.user.username);
      this.watchers.push(watcher.user.username);
      this.watchersMap[watcher.user.username] = watcher;
    }
  }

  public addFriend(friend: DeviantFriend) {
    if (friend.user && friend.user.username) {
      console.log("Add friend: ", friend, friend.user.username);
      this.friends.push(friend.user.username);
      this.friendsMap[friend.user.username] = friend;
    }
  }

  public followDeviant(deviant: string) {
    this.deviantFollowService.watch(deviant)
    .subscribe((res: WatchResponse) => {
      console.log("FOLLOW RES: ", res);
      if (res.statusCode === 403) {
        this.auth.userUnauthForMedia(Media.DeviantArt);
      } else if (res.statusCode !== 0 || res.responseData.status === 'error') {
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
    .subscribe((res: WatchResponse) => {
      console.log("UNFOLLOW RES: ", res);
      if (res.statusCode === 403) {
        this.auth.userUnauthForMedia(Media.Tumblr);
      } else if (res.statusCode !== 0 || res.responseData.status === 'error') {
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

