import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { BlogService } from '../../services/blog.service';
import { TumblrFollowService } from '../../services/tumblr-follow.service';
import { AuthService } from '../../services/auth.service';
import { DeviantData } from '../../types/deviant.types';

@Component({
  selector: 'app-deviantart',
  templateUrl: './deviantart.component.html',
  styleUrls: ['./deviantart.component.scss']
})
export class DeviantArtComponent implements OnInit {
  constructor(
    private alertService: AlertService,
    private blogService: BlogService,
    private tumblrFollowService: TumblrFollowService, 
    private authService: AuthService,
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

  // public tumblrFollowers: string[] = [];
  // public tumblrFollowerMap: { [user: string] : TumblrUser } = {};
  // private tumblrFollowerOffset = 0;
  // private hasMoreTumblrFollowers = true;

  // public tumblrFollowing: string[] = [];
  // public tumblrFollowingMap: { [user: string] : TumblrBlog } = {};
  // private tumblrFollowingOffset = 0;
  // private hasMoreTumblrFollowing = true;

  ngOnInit() {
  }

  public setupDASubscription() {
    this.deviantUserSubject$
      .subscribe((user: DeviantData) => {
        console.log("Received DA user: ", user);
        this.deviant = user;
      });
  }
/*
  public onBlogSearch(blog: string) {
 
    if (this.tumblrUser && blog !== this.blog) {
      this.blog = blog;
      this.alertService.showAlert(AlertType.Info, `Retrieving data for ${this.blog}...`);
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
              this.alertService.showAlert(AlertType.Error, `Unable to follow ${blog}.`);
              console.log(`Failed to follow: ${blog}, ${res}`);
            } else {
              this.alertService.showAlert(AlertType.Success, `You followed ${blog}.`);
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
              this.router.navigateByUrl('/auth');
            } else if (res.statusCode !== 0) {
              console.log(`Failed to unfollow: ${blog}, `, res);
              this.alertService.showAlert(AlertType.Error, `Unable to unfollow ${blog}.`);
            } else {
              console.log(`Successfully unfollowed: ${blog}, refresh`);
              this.alertService.showAlert(AlertType.Success, `You unfollowed ${blog}.`);
              this.getTumblrFollowersAndFollowing();
            }
            console.log("Try to unfollow: ", res);
          })
        break;
    }
  }

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
  }*/
}
