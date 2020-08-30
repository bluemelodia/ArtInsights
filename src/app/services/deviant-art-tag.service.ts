import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlForSite } from '../app.endpoints';
import { Media, UserMediaAction } from '../app.consts';

@Injectable({
  providedIn: 'root'
})
export class DeviantArtTagService {
  public deviantArtTagURL = urlForSite(Media.DeviantArt, UserMediaAction.Tags);

  constructor(private http: HttpClient) { }

  public getDeviationsForTag(tag: string) {
    const url = this.deviantArtTagURL + `/${tag}`;
    console.log(`📗 Get deviations for tag ${tag}: `, url);
    return this.http.get<any>(url, { withCredentials: true });
  }
}
