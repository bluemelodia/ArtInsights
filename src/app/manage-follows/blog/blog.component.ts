import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { media } from '../../app.consts';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
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
