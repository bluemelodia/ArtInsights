import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { media, userAction } from '../../app.consts';
import { urlForSite } from '../../app.endpoints';

@Injectable({
  providedIn: 'root'
})
export class DeviantArtFollowService {
  public deviantArtFriends = urlForSite(media.DeviantArt, userAction.Followers);
  public deviantArtFollowers = urlForSite(media.DeviantArt, userAction.Following);
  public followDeviant = urlForSite(media.DeviantArt, userAction.Follow);
  public unfollowDeviant = urlForSite(media.DeviantArt, userAction.Unfollow);

  constructor(private http: HttpClient) { }

  public getDAFriends(username: string, offset: number = 0): Observable<any> {
    const url = this.deviantArtFriends + `/${username}/offset/${offset}`;
    console.log(`📗 Get DA friends for ${username}: `, url);
    return this.http.get<any>(url);
  }
}
