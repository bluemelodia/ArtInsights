import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Media, UserMediaAction } from '../../app.consts';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  @Input() isFollowing: boolean;
  @Input() mediaType: Media;

  @Output() onUserAction = new EventEmitter<UserMediaAction>();

  @HostBinding('class') get themeClasses(): string {
    switch(this.mediaType) {
      case Media.Tumblr:
        return 'tumblr-theme';
      case Media.DeviantArt:
        return 'deviant-art-theme';
      default:
        return '';
    }
  }

  constructor() { }

  ngOnInit() {
  }

  updateBlogFollowStatus() {
    if (this.isFollowing) {
      this.onUserAction.emit(UserMediaAction.Unfollow);
    } else {
      this.onUserAction.emit(UserMediaAction.Follow);
    }
  }
}
