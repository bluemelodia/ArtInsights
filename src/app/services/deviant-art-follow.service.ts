import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Media, UserMediaAction } from '../app.consts';
import { urlForSite } from '../app.endpoints';

@Injectable({
  providedIn: 'root'
})
export class DeviantArtFollowService {
  public deviantArtFriends = urlForSite(Media.DeviantArt, UserMediaAction.Followers);
  public deviantArtFollowers = urlForSite(Media.DeviantArt, UserMediaAction.Following);
  public watchDeviant = urlForSite(Media.DeviantArt, UserMediaAction.Follow);
  public unwatchDeviant = urlForSite(Media.DeviantArt, UserMediaAction.Unfollow);

  constructor(private http: HttpClient) { }

  public getDAFriends(username: string, offset: number = 0): Observable<any> {
    const url = this.deviantArtFriends + `/${username}/offset/${offset}`;
    console.log(`📗 Get DA friends for ${username}: `, url);
    return this.http.get<any>(url, { withCredentials: true });
  }

  public watch(deviant: string): Observable<any> {
    const url = this.watchDeviant + `/${deviant}`;
    console.log(`📘 Watch ${deviant}: `, url);
    return this.http.get<any>(url, { withCredentials: true });
  }

  public unwatch(deviant: string): Observable<any> {
    const url = this.unwatchDeviant + `/${deviant}`;
    console.log(`📘 Unwatch ${deviant}: `, url);
    return this.http.get<any>(url, { withCredentials: true });
  }
}
