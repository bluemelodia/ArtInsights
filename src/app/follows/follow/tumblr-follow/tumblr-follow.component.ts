import { Component, OnInit, Input } from '@angular/core';
import { TumblrUser, TumblrBlog } from '../../follow.types';
import { BlogUtilsService } from '../../blog-utils.service';
import { userAction } from '../../../app.consts';

@Component({
  selector: 'app-tumblr-follow',
  templateUrl: './tumblr-follow.component.html',
  styleUrls: ['./tumblr-follow.component.scss']
})
export class TumblrFollowComponent implements OnInit {
  @Input() tumblrFollowers: string[] = [];
  @Input() tumblrFollowerMap: { [user: string] : TumblrUser } = {};

  @Input() tumblrFollowing: string[] = [];
  @Input() tumblrFollowingMap: { [user: string] : TumblrBlog } = {};  
  
  constructor(public blogUtils: BlogUtilsService) { }

  ngOnInit() {
  }

  public showTumblrWidget() {
    return this.tumblrFollowers.length > 0 || this.tumblrFollowing.length > 0;
  }

  /* Generic callback for when user clicks on a button in the blog component. */
  public onUserAction(action: userAction) {

  }
  
  public followsYou(blog: string) {
    return blog in this.tumblrFollowerMap;
  }
}
