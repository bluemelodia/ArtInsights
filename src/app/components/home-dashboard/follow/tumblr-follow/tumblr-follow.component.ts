import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { TumblrUser, TumblrBlog } from '../../follow.types';
import { BlogUtilsService } from '../../blog-utils.service';
import { UserMediaAction, Media } from '../../../../app.consts';

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

  public mediaType = Media.Tumblr;

  constructor(public blogUtils: BlogUtilsService) { }

  ngOnInit() {
  }

  /* Generic callback for when user clicks on a button in the blog component. */
  public onUserAction(action: UserMediaAction, blog: string) {
    console.log("On user action: ", action, blog);
    switch(action) {
      case UserMediaAction.Follow:
        this.followBlog.emit(blog);
        break;
      case UserMediaAction.Unfollow:
        this.unfollowBlog.emit(blog);
        break;
    }
  }
  
  public followsYou(blog: string) {
    return blog in this.tumblrFollowerMap;
  }
}
