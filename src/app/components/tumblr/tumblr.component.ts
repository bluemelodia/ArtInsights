import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ReplaySubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AlertService } from '../../services/alert.service';
import { BlogService } from '../../services/blog.service';
import { TumblrFollowService } from '../../services/tumblr-follow.service';
import { AuthService } from '../../services/auth.service';
import { TumblrUserInfo, TumblrUser, TumblrBlog, TumblrBlogResponse, TumblrFollowers, TumblrFollowing } from '../../types/tumblr.types';
import { AlertType, Media } from '../../app.consts';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-tumblr',
  templateUrl: './tumblr.component.html',
  styleUrls: ['./tumblr.component.scss']
})
export class TumblrComponent implements OnInit, OnDestroy {
  constructor(
    private alert: AlertService,
    private auth: AuthService,
    private blog: BlogService,
    private loading: LoadingService,
    private tumblrFollowService: TumblrFollowService, 
    private router: Router
  ) {
    this.setupTumblrSubscription();
    this.router.events
      .pipe(takeUntil(this.destroyed$))
      .subscribe(event => {
        if (event instanceof NavigationEnd && event.url === "/home/tumblr"){
          if (this.auth.isAuthorizedForMedia(Media.Tumblr)) {
            this.blog.getTumblrUser();
            this.loading.hideLoader();
          } else {
            this.auth.userUnauthForMedia(Media.Tumblr);
          }
        }
    });
  }

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  public tumblrUser: TumblrUserInfo;
  public userBlog: string;

  private tumblrUser$: Observable<TumblrUserInfo> = this.blog.tumblrUserSub;

  /*
  * The Tumblr API total_blogs and total_users fields do not reflect the actual number
  * of blogs/users that the blog is being followed by/is following. Therefore, stop
  * fetching more followers/following when new entries are no longer being returned
  * by the API calls (we are getting repeats back).
  */
  public tumblrFollowers: string[] = [];
  public tumblrFollowerMap: { [user: string] : TumblrUser } = {};
  private tumblrFollowerOffset = 0;
  private hasMoreTumblrFollowers = true;

  public tumblrFollowing: string[] = [];
  public tumblrFollowingMap: { [user: string] : TumblrBlog } = {};
  private tumblrFollowingOffset = 0;
  private hasMoreTumblrFollowing = true;

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public setupTumblrSubscription() {
    this.tumblrUser$
      .subscribe((user: TumblrUserInfo) => {
        this.tumblrUser = user;

        /* Get results for the first blog by default. */
        if (this.tumblrUser.blogs && this.tumblrUser.blogs.length > 0) {
          this.onBlogSearch(this.tumblrUser.blogs[0].name);
        }
      });
  }

  public onBlogSearch(blog: string) {
    /* New blog search, reset all. */
    if (this.tumblrUser && blog !== this.userBlog) {
      this.userBlog = blog;
      this.alert.showAlert(AlertType.Info, `Retrieving Tumblr blog data...`);
      this.getTumblrFollowersAndFollowing();
    }
  }

  public getTumblrFollowersAndFollowing() {
    this.resetTumblrStats();
    this.getTumblrFollowers(this.userBlog, this.tumblrFollowerOffset);
    this.getTumblrFollowing(this.userBlog, this.tumblrFollowingOffset);
  }

  public followTumblr(blog: string) {
    this.tumblrFollowService.followBlog(blog)
      .subscribe((res: any) => {
        if (res.statusCode === 403) {
          this.auth.userUnauthForMedia(Media.Tumblr);
        } else if (res.statusCode !== 0) {
          this.alert.showAlert(AlertType.Error, `Unable to follow ${blog}.`);
        } else {
          this.alert.showAlert(AlertType.Success, `You followed ${blog}.`);
          this.getTumblrFollowersAndFollowing();
        }
    })
  }

  public unfollowTumblr(blog: string) {
    this.tumblrFollowService.unfollowBlog(blog)
    .subscribe((res: any) => {
      if (res.statusCode === 450) {
        this.auth.userUnauthForMedia(Media.Tumblr);
      } else if (res.statusCode !== 0) {
        this.alert.showAlert(AlertType.Error, `Unable to unfollow ${blog}.`);
      } else {
        this.alert.showAlert(AlertType.Success, `You unfollowed ${blog}.`);
        this.getTumblrFollowersAndFollowing();
      }
    })  
  }

  /* Get next page of followers/followings. */
  public getNextFollowers() {
    this.getMoreTumblrFollowers(this.userBlog);
  }

  private getMoreTumblrFollowers(blog: string) {
    if (this.hasMoreTumblrFollowers) {
      this.getTumblrFollowers(blog, this.tumblrFollowerOffset);
    }
  }

  public getNextFollowing() {
    this.getMoreTumblrFollowing(this.userBlog);
  }

  private getMoreTumblrFollowing(blog: string) {
    if (this.hasMoreTumblrFollowing) {
      this.getTumblrFollowing(blog, this.tumblrFollowingOffset);
    }
  }

  private resetTumblrStats() {
    this.tumblrFollowers = [];
    this.tumblrFollowerMap = {};
    this.tumblrFollowerOffset = 0;
    this.hasMoreTumblrFollowers = true;

    this.tumblrFollowing = [];
    this.tumblrFollowingMap = {};
    this.tumblrFollowingOffset = 0;
    this.hasMoreTumblrFollowing = true;
  }

  public getTumblrFollowers(blog: string, offset: number = 0) {
    this.tumblrFollowService.getTumblrFollowers(blog, offset)
      .subscribe((blogData: TumblrBlogResponse) => { 
        if (blogData.statusCode !== -1) {
          const responseData = blogData.responseData as TumblrFollowers;
          if (!responseData.users || responseData.users.length < 1) {
            this.hasMoreTumblrFollowers = false;
          }
          responseData.users.forEach((user: TumblrUser) => {
            if (user.name in this.tumblrFollowerMap) {
              this.hasMoreTumblrFollowers = false;
            } else {
              this.addTumblrFollower(user);
            }
          });
        }
      })
  }

  private addTumblrFollower(user: TumblrUser) {
    let follower: TumblrUser = {
      name: user.name, 
      url: user.url,
      updated: user.updated, 
      following: user.following
    };
    this.tumblrFollowers.push(follower.name);
    this.tumblrFollowerMap[follower.name] = follower;
    this.tumblrFollowerOffset++;
  }

  public getTumblrFollowing(blog: string, offset: number = 0) {
    this.tumblrFollowService.getTumblrFollowing(blog, offset)
      .subscribe((blogData: TumblrBlogResponse) => {
        if (blogData.statusCode !== -1) {
          const responseData = blogData.responseData as TumblrFollowing;
          if (!responseData.blogs || responseData.blogs.length < 1) {
            this.hasMoreTumblrFollowing = false;
          }
          responseData.blogs.forEach((blog: TumblrBlog) => {
            if (blog.name in this.tumblrFollowingMap) {
              this.hasMoreTumblrFollowing = false;
            } else {
              this.addTumblrFollowing(blog);
            }
          });
        }
      })
  }

  private addTumblrFollowing(blog: TumblrBlog) {
    let tumblrFollowing: TumblrBlog = {
      name: blog.name, 
      title: blog.title,
      url: blog.url,
      updated: blog.updated
    };
    this.tumblrFollowing.push(tumblrFollowing.name);
    this.tumblrFollowingMap[tumblrFollowing.name] = tumblrFollowing;
    this.tumblrFollowingOffset++;
  }
}
