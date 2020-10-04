import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TumblrUserInfo, TumblrUserBlog } from '../../../types/tumblr.types';
import { UtilsService } from '../../../services/utils.service';
import { BlogUtilsService } from '../../../services/blog-utils.service';


@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class TumblrBlogListComponent implements OnInit {
  @Input() userInfo: TumblrUserInfo;
  @Output() getFollowers = new EventEmitter<string>();

  /* Default user avatar. */
  public defaultAvatar = this.utils.getImagePath('tumblr-avatar');

  constructor(private utils: UtilsService, public blogUtils: BlogUtilsService) { }

  ngOnInit() {
  }

  avatarForBlog(blog: TumblrUserBlog) {
    if (blog.avatar && blog.avatar.length > 0) {
        return blog.avatar[0].url;
    }
    return this.defaultAvatar;
  }

  getFollows(blog: string) {
    this.getFollowers.emit(blog);
  }
}
