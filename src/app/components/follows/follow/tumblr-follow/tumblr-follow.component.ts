import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { TumblrUser, TumblrBlog } from '../../follow.types';
import { BlogUtilsService } from '../../blog-utils.service';
import { userAction, media } from '../../../../app.consts';

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

  @Output() followBlog = new EventEmitter<string>();
  @Output() unfollowBlog = new EventEmitter<string>();

  public mediaType = media.Tumblr;

  constructor(public blogUtils: BlogUtilsService) { }

  ngOnInit() {
  }

  public showTumblrWidget() {
    return this.tumblrFollowers.length > 0 || this.tumblrFollowing.length > 0;
  }

  /* Generic callback for when user clicks on a button in the blog component. */
  public onUserAction(action: userAction, blog: string) {
    console.log("On user action: ", action, blog);
    switch(action) {
      case userAction.Follow:
        this.followBlog.emit(blog);
        break;
      case userAction.Unfollow:
        this.unfollowBlog.emit(blog);
        break;
    }
  }
  
  public followsYou(blog: string) {
    return blog in this.tumblrFollowerMap;
  }
}
