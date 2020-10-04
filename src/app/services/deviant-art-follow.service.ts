import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Media, UserMediaAction } from '../app.consts';
import { urlForSite } from '../app.endpoints';

@Injectable({
  providedIn: 'root'
})
export class DeviantArtFollowService {
  public deviantArtWatchers = urlForSite(Media.DeviantArt, UserMediaAction.Followers);
  public deviantArtFriends = urlForSite(Media.DeviantArt, UserMediaAction.Following);
  public watchDeviant = urlForSite(Media.DeviantArt, UserMediaAction.Follow);
  public unwatchDeviant = urlForSite(Media.DeviantArt, UserMediaAction.Unfollow);

  constructor(private http: HttpClient) { }

  public getDAWatchers(username: string, offset: number = 0): Observable<any> {
    const url = this.deviantArtWatchers + `/${username}/offset/${offset}`;
    return this.http.get<any>(url, { withCredentials: true });
  }

  public getDAFriendsList(username: string, offset: number = 0): Observable<any> {
    const url = this.deviantArtFriends + `/${username}/offset/${offset}`;
    return this.http.get<any>(url, { withCredentials: true });
  }

  public watch(deviant: string): Observable<any> {
    const url = this.watchDeviant + `/${deviant}`;
    return this.http.get<any>(url, { withCredentials: true });
  }

  public unwatch(deviant: string): Observable<any> {
    const url = this.unwatchDeviant + `/${deviant}`;
    return this.http.get<any>(url, { withCredentials: true });
  }
}
