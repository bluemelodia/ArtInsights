import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { TumblrFollowService } from '../tumblr-follow.service';
import { TumblrBlog, TumblrBlogResponse, TumblrFollowers, TumblrFollowing, TumblrUser, Deviant } from '../follow.types';
import { Media } from '../../../app.consts';
import { AuthService } from '../../../services/auth.service';
import { Subject } from 'rxjs';
import { DeviantArtFollowService } from '../deviant-art-follow.service';
import { BlogService } from '../../../services/blog.service';
import { Router, NavigationEnd } from '@angular/router';
import { TumblrUserInfo } from '../../../types/tumblr.types';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private tumblrFollowService: TumblrFollowService, 
    private daFollowService: DeviantArtFollowService,
    private authService: AuthService,
    private router: Router
  ) {
    this.setupTumblrSubscription();

    this.router.events.subscribe(event =>{
      if (event instanceof NavigationEnd){
        console.log("Nav ending, get Tumblr user: ", event);
        this.blogService.getTumblrUser();
      }
   })
  }

  public tumblrUser: TumblrUserInfo;
  public blog: string;

  /*
   * The Tumblr API total_blogs and total_users fields do not reflect the actual number
   * of blogs/users that the blog is being followed by/is following. Therefore, stop
   * fetching more followers/following when new entries are no longer being returned
   * by the API calls (we are getting repeats back).
   */
  private tumblrUserSubject$ = this.blogService.tumblrUserSub$;

  public tumblrFollowers: string[] = [];
  public tumblrFollowerMap: { [user: string] : TumblrUser } = {};
  private tumblrFollowerOffset = 0;
  private hasMoreTumblrFollowers = true;

  public tumblrFollowing: string[] = [];
  public tumblrFollowingMap: { [user: string] : TumblrBlog } = {};
  private tumblrFollowingOffset = 0;
  private hasMoreTumblrFollowing = true;

  public deviantArtFriends: string[] = [];
  public deviantArtFriendMap: { [user: string]: Deviant } = {};
  private deviantArtFriendOffset = 0;
  private hasMoreDAFriends = true;

  ngOnInit() {
  }

  public setupTumblrSubscription() {
    this.tumblrUserSubject$
      .subscribe((user: TumblrUserInfo) => {
        console.log("Received Tumblr user: ", user);
        this.tumblrUser = user;
      });
  }

  public onBlogSearch(blog: string) {
    /* New blog search, reset all. */
    if (this.tumblrUser) {
      this.blog = blog;
      this.getDeviantArtFriendsAndFollowers();
      this.getTumblrFollowersAndFollowing();
    }
  }

  public getTumblrFollowersAndFollowing() {
    this.resetTumblrStats();
    this.getTumblrFollowers(this.blog, this.tumblrFollowerOffset);
    this.getTumblrFollowing(this.blog, this.tumblrFollowingOffset);
  }
  
  private follow(blog: string, medium: Media) {
    switch(medium) {
      case Media.Tumblr:
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

  private unfollow(blog: string, medium: Media) {
    switch(medium) {
      case Media.Tumblr:
        this.tumblrFollowService.unfollowBlog(blog)
          .subscribe((res: any) => {
            if (res.statusCode === 403) {
              this.authService.authenticateUser(medium);
            } else if (res.statusCode !== 0) {
              console.log(`Failed to unfollow: ${blog}, `, res);
            } else {
              console.log(`Successfully unfollowed: ${blog}, refresh`);
              this.getTumblrFollowersAndFollowing();
            }
            console.log("Try to unfollow: ", res);
          })
        break;
    }
  }

  /* DeviantArt-specific actions. */
  private resetDAStats() {
    this.deviantArtFriends = [];
    this.deviantArtFriendMap = {};
    this.deviantArtFriendOffset = 0;
    this.hasMoreDAFriends = true;
  }

  public getDeviantArtFriendsAndFollowers() {
    this.resetDAStats();
    this.getDeviantArtFriends(this.deviantArtFriendOffset);
  }

  public getDeviantArtFriends(offset: number = 0) {
    console.log("GET DA FRIENDS");
    this.daFollowService.getDAFriends('username', offset)
      .subscribe((res: any) => {
        if (res.statusCode === 403) {
          this.authService.authenticateUser(Media.DeviantArt);
        } else {
          console.log("YO ", res);
        }
      });
  }

  /* Tumblr-specific actions. */
  public followTumblr(blog: string) {
    this.follow(blog, Media.Tumblr);
  }

  public unfollowTumblr(blog: string) {
    this.unfollow(blog, Media.Tumblr);
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
