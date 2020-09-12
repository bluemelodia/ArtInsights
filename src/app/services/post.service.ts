import { Injectable } from '@angular/core';
import { Media, UserMediaAction } from '../app.consts';
import { urlForSite } from '../app.endpoints';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private deviationsURL = urlForSite(Media.DeviantArt, UserMediaAction.Posts);
  private tumblrPostsURL = urlForSite(Media.Tumblr, UserMediaAction.Posts);

  constructor(private http: HttpClient) { }

  /* Don't need to get all deviations, just recent ones. */
  public getDeviations(username: string) {
    const url = this.deviationsURL + `/${username}`;
    console.log(`📗 Get deviations for ${username}: `, url);
    return this.http.get<any>(url, { withCredentials: true });
  }
}
