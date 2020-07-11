import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { media, userAction } from '../app.consts';
import { urlForSite } from '../app.endpoints';
import { BlogResponse } from './follow.types';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  public tumblrFollowers = urlForSite(media.Tumblr, userAction.Followers);
  public tumblrFollowing = urlForSite(media.Tumblr, userAction.Following);

  constructor(private http: HttpClient) { }

  public getTumblrFollowers(blogger: string, offset: number = 0): Observable<BlogResponse> {
    const url = this.tumblrFollowers + `/${blogger}/offset/${offset}`;
    console.log("FOLLOWERS URL: ", url);
    return this.http.get<BlogResponse>(url);
  }

  public getTumblrFollowing(blogger: string, offset: number = 0): Observable<BlogResponse> {
    const url = this.tumblrFollowing + `/${blogger}/offset/${offset}`;
    console.log("FOLLOWING URL: ", url);
    return this.http.get<BlogResponse>(url);
  }
}
