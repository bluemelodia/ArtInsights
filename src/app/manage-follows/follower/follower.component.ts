import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { media } from '../../app.consts';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.scss']
})
export class FollowerComponent implements OnInit {
  @Input() isFollowing: boolean;
  @Input() mediaType: media;

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
}
