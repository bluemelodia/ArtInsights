import { Injectable } from '@angular/core';
import { media, userAction } from '../app.consts';
import { urlForSite } from '../app.endpoints';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  public tumblrFollowers = urlForSite(media.Tumblr, userAction.Followers);
  public tumblrFollowing = urlForSite(media.Tumblr, userAction.Followers);

  constructor() { }

  public getTumblrFollowers() {
    
  }

  public getTumblrFollowing() {

  }
}
