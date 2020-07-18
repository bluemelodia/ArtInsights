import { Component, OnInit } from '@angular/core';
import { TumblrFollowService } from '../tumblr-follow.service';
import { TumblrBlog, TumblrBlogResponse, TumblrFollowers, TumblrFollowing, TumblrUser } from '../follow.types';
import { media } from '../../app.consts';
import { AuthService } from '../../auth.service';
import { RedirectService } from '../../redirect.service';
import { Subject } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnInit {
  constructor(
    private tumblrFollowService: TumblrFollowService, 
    private authService: AuthService,
    private redirectService: RedirectService,
  ) {
    this.setupRedirectSubscription();
  }

  private blog: string;

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

  private authRedirectSubject$: Subject<string>;

  ngOnInit() {

  }

  public onBlogSearch(blog: string) {
    /* New blog search, reset all. */
    if (blog.length > 0 && blog !== this.blog) {
      this.blog = blog;
      this.getTumblrFollowersAndFollowing();
    }
  }

  public getTumblrFollowersAndFollowing() {
    this.resetTumblrStats;
    this.getTumblrFollowers(this.blog, this.tumblrFollowerOffset);
    this.getTumblrFollowing(this.blog, this.tumblrFollowingOffset);
  }

  private setupRedirectSubscription() {
    this.authRedirectSubject$ = this.authService.redirectSubject$;
    this.authRedirectSubject$
      .subscribe((redirectLink) => {
        console.log("Prepare to redirect to auth link: ", redirectLink);
        this.redirectService.redirect(redirectLink);
      })
  }

  private follow(blog: string, medium: media) {
    switch(medium) {
      case media.Tumblr:
        this.tumblrFollowService.followBlog(blog)
          .subscribe((res: any) => {
            if (res.statusCode === 403) {
              this.authService.authenticateUser(medium);
            } else if (res.statusCode !== 0) {
              console.log(`Failed to follow: ${blog}, ${res}`);
            } else {
              console.log(`Successfully followed: ${blog}, refresh`);
              this.getTumblrFollowersAndFollowing();
            }
            console.log("Try to follow: ", res);
          })
        break;
    }
  }

  private unfollow(blog: string, medium: media) {
    switch(medium) {
      case media.Tumblr:
        this.tumblrFollowService.unfollowBlog(blog)
          .subscribe((res: any) => {
            if (res.statusCode === 403) {
              this.authService.authenticateUser(medium);
            } else if (res.statusCode !== 0) {
              console.log(`Failed to unfollow: ${blog}, ${res}`);
            } else {
              console.log(`Successfully unfollowed: ${blog}, refresh`);
              this.getTumblrFollowersAndFollowing();
            }
            console.log("Try to unfollow: ", res);
          })
        break;
    }
  }

  public followTumblr(blog: string) {
    this.follow(blog, media.Tumblr);
  }

  public unfollowTumblr(blog: string) {
    this.unfollow(blog, media.Tumblr);
  }

  /* Tumblr-specific actions. */
  public resetTumblrStats() {
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
          this.getMoreTumblrFollowers(blog);
          console.log("TumblrFollowers 🙌🏼: ", blogData, this.tumblrFollowers)
        }
      })
  }

  private getMoreTumblrFollowers(blog: string) {
    if (this.hasMoreTumblrFollowers) {
      this.getTumblrFollowers(blog, this.tumblrFollowerOffset);
    }
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
          this.getMoreTumblrFollowing(blog);
          console.log("TumblrFollowing 🎀: ", blogData, this.tumblrFollowing);
        }
      })
  }

  private getMoreTumblrFollowing(blog: string) {
    if (this.hasMoreTumblrFollowing) {
      this.getTumblrFollowing(blog, this.tumblrFollowingOffset);
    }
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
