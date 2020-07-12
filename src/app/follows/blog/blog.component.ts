import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { media, userAction } from '../../app.consts';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  @Input() isFollowing: boolean;
  @Input() mediaType: media;

  @Output() onUserAction = new EventEmitter<userAction>();

  @HostBinding('class') get themeClasses(): string {
    switch(this.mediaType) {
      case media.Tumblr:
        return 'tumblr-theme';
      default:
        return '';
    }
  }

  constructor() { }

  ngOnInit() {
  }

  updateBlogFollowStatus() {
    if (this.isFollowing) {
      this.onUserAction.emit(userAction.Unfollow);
    } else {
      this.onUserAction.emit(userAction.Follow);
    }
  }
}
