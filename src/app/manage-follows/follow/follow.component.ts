import { Component, OnInit } from '@angular/core';
import { FollowService } from '../follow.service';
import { Blog, BlogResponse, Followers, Following, User } from '../follow.types';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnInit {
  constructor(private followService: FollowService) { }

  private blog: string;

  /*
   * The Tumblr API total_blogs and total_users fields do not reflect the actual number
   * of blogs/users that the blog is being followed by/is following. Therefore, stop
   * fetching more followers/following when new entries are no longer being returned
   * by the API calls (we are getting repeats back).
   */
  private followers: string[] = [];
  private followerMap: { [user: string] : User } = {};
  private followerOffset = 0;
  private hasMoreFollowers = true;

  private following: string[] = [];
  private followingMap: { [user: string] : Blog } = {};
  private followingOffset = 0;
  private hasMoreFollowing = true;

  ngOnInit() {

  }

  public onBlogSearch(blog: string) {
    /* New blog search, reset all. */
    if (blog.length > 0 && blog !== this.blog) {
      this.resetBlogStats;
      this.getFollowers(blog, this.followerOffset);
      this.getFollowing(blog, this.followingOffset);
    }
  }

  private getMoreFollowers(blog: string) {
    if (this.hasMoreFollowers) {
      this.getFollowers(blog, this.followerOffset);
    }
  }

  private getMoreFollowing(blog: string) {
    if (this.hasMoreFollowing) {
      this.getFollowing(blog, this.followingOffset);
    }
  }

  public resetBlogStats() {
    this.followers = [];
    this.followerMap = {};
    this.followerOffset = 0;
    this.hasMoreFollowers = true;

    this.following = [];
    this.followingMap = {};
    this.followingOffset = 0;
    this.hasMoreFollowing = true;
  }

  public getFollowers(blogger: string, offset: number = 0) {
    this.followService.getTumblrFollowers(blogger, offset)
      .subscribe((blogData: BlogResponse) => { 
        if (blogData.statusCode !== -1) {
          const responseData = blogData.responseData as Followers;
          if (!responseData.users || responseData.users.length < 1) {
            this.hasMoreFollowers = false;
          }
          responseData.users.forEach((user: User) => {
            if (user.name in this.followerMap) {
              this.hasMoreFollowers = false;
            } else {
              this.addFollower(user);
            }
          });
          this.getMoreFollowers(blogger);
          console.log("Followers 🙌🏼: ", blogData, this.followers)
        }
      })
  }

  private addFollower(user: User) {
    let follower: User = {
      name: user.name, 
      url: user.url,
      updated: user.updated, 
      following: user.following
    };
    this.followers.push(follower.name);
    this.followerMap[follower.name] = follower;
    this.followerOffset++;
  }

  public getFollowing(blogger: string, offset: number = 0) {
    this.followService.getTumblrFollowing(blogger, offset)
      .subscribe((blogData: BlogResponse) => {
        if (blogData.statusCode !== -1) {
          const responseData = blogData.responseData as Following;
          if (!responseData.blogs || responseData.blogs.length < 1) {
            this.hasMoreFollowing = false;
          }
          responseData.blogs.forEach((blog: Blog) => {
            if (blog.name in this.followingMap) {
              this.hasMoreFollowing = false;
            } else {
              this.addFollowing(blog);
            }
          });
          this.getMoreFollowing(blogger);
          console.log("Following 🎀: ", blogData, this.following);
        }
      })
  }

  private addFollowing(blog: Blog) {
    let following: Blog = {
      name: blog.name, 
      title: blog.title,
      url: blog.url,
      updated: blog.updated
    };
    this.following.push(following.name);
    this.followingMap[following.name] = following;
    this.followingOffset++;
  }
}
