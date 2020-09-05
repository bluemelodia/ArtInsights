import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlForSite } from '../app.endpoints';
import { Media, UserMediaAction } from '../app.consts';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  public deviantArtTagURL = urlForSite(Media.DeviantArt, UserMediaAction.Tags);
  public tumblrTagURL = urlForSite(Media.Tumblr, UserMediaAction.Tags);

  constructor(private http: HttpClient) { }

  public getDeviationsForTag(tag: string) {
    /* DA tags have no spaces. */
    const daTag = tag.replace(/\s+/g, '');

    const url = this.deviantArtTagURL + `/${daTag}`;
    console.log(`📗 Get deviations for tag ${daTag}: `, url);
    return this.http.get<any>(url, { withCredentials: true });
  }

  public getTumblrPostsForTag(tag: string) {
    const url = this.tumblrTagURL + `/${tag}`;
    console.log(`📗 Get deviations for tag ${tag}: `, url);
    return this.http.get<any>(url, { withCredentials: true });
  }
}
