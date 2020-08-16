import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Media, UserMediaAction } from '../../app.consts';
import { urlForSite } from '../../app.endpoints';
import { TumblrBlogResponse } from './follow.types';

@Injectable({
  providedIn: 'root'
})
export class TumblrFollowService {
  public tumblrFollowers = urlForSite(Media.Tumblr, UserMediaAction.Followers);
  public tumblrFollowing = urlForSite(Media.Tumblr, UserMediaAction.Following);
  public followTumblrBlog = urlForSite(Media.Tumblr, UserMediaAction.Follow);
  public unfollowTumblrBlog = urlForSite(Media.Tumblr, UserMediaAction.Unfollow);

  constructor(private http: HttpClient) { }

  public getTumblrFollowers(blog: string, offset: number = 0): Observable<TumblrBlogResponse> {
    const url = this.tumblrFollowers + `/${blog}/offset/${offset}`;
    console.log(`📘 Get Tumblr followers for ${blog}: `, url);
    return this.http.get<TumblrBlogResponse>(url, { withCredentials: true });
  }

  public getTumblrFollowing(blog: string, offset: number = 0): Observable<TumblrBlogResponse> {
    const url = this.tumblrFollowing + `/${blog}/offset/${offset}`;
    console.log(`📘 Get Tumblr following for ${blog}: `, url);
    return this.http.get<TumblrBlogResponse>(url, { withCredentials: true });
  }

  public followBlog(blog: string): Observable<TumblrBlogResponse> {
    const url = this.followTumblrBlog + `?blog=${this.removeTrailingSlash(blog)}`;
    console.log(`📘 Follow Tumblr blog ${blog}: `, url);
    return this.http.get<TumblrBlogResponse>(url, { withCredentials: true });
  }

  public unfollowBlog(blog: string): Observable<TumblrBlogResponse> {
    const url = this.unfollowTumblrBlog + `?blog=${this.removeTrailingSlash(blog)}`;
    console.log(`📘 Unfollow Tumblr blog ${blog}: `, url);
    return this.http.get<TumblrBlogResponse>(url, { withCredentials: true });
  }

  private removeTrailingSlash(url: string) {
    let newURL = url;
    if (url.lastIndexOf('/') === url.length - 1) {
      newURL = url.slice(0, -1);
    }
    return newURL;
  }
}
