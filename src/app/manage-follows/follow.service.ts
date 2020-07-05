import { Injectable } from '@angular/core';
import { media, userAction } from '../app.consts';
import { urlForSite } from '../app.endpoints';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  public tumblrURL = urlForSite(media.Tumblr, userAction.Follow);
  public deviantArtURL = urlForSite(media.DeviantArt, userAction.Follow);

  constructor() { }
}
