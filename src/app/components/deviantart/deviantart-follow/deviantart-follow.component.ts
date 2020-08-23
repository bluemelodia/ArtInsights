import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviantWatchers, DeviantWatcher } from '../../../types/deviant.types';
import { Media, UserMediaAction } from '../../../app.consts';
import { BlogUtilsService } from '../../../services/blog-utils.service';

@Component({
  selector: 'app-deviantart-follow',
  templateUrl: './deviantart-follow.component.html',
  styleUrls: ['./deviantart-follow.component.scss']
})
export class DeviantArtFollowComponent implements OnInit {
  @Input() watchers: [DeviantWatcher];
  @Input() watchersMap: { [user: string] : DeviantWatcher } = {};

  @Output() followBlog = new EventEmitter<string>();
  @Output() unfollowBlog = new EventEmitter<string>();

  public mediaType = Media.DeviantArt;

  constructor(public blogUtils: BlogUtilsService) { }

  ngOnInit() {
  }

  public getDAURL(username: string) {
    return 'http://' + username + '.deviantart.com';
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
}
