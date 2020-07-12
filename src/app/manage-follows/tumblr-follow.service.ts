import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { media, userAction } from '../app.consts';
import { urlForSite } from '../app.endpoints';
import { TumblrBlogResponse } from './follow.types';

@Injectable({
  providedIn: 'root'
})
export class TumblrFollowService {
  public tumblrFollowers = urlForSite(media.Tumblr, userAction.Followers);
  public tumblrFollowing = urlForSite(media.Tumblr, userAction.Following);

  constructor(private http: HttpClient) { }

  public getTumblrFollowers(blog: string, offset: number = 0): Observable<TumblrBlogResponse> {
    const url = this.tumblrFollowers + `/${blog}/offset/${offset}`;
    console.log(`📘 Get Tumblr followers for ${blog}: `, url);
    return this.http.get<TumblrBlogResponse>(url);
  }

  public getTumblrFollowing(blog: string, offset: number = 0): Observable<TumblrBlogResponse> {
    const url = this.tumblrFollowing + `/${blog}/offset/${offset}`;
    console.log(`📘 Get Tumblr following for ${blog}: `, url);
    return this.http.get<TumblrBlogResponse>(url);
  }
}
