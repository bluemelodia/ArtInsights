import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DeviantWatcher, DeviantFriend } from '../../../types/deviant.types';
import { Media, UserMediaAction } from '../../../app.consts';
import { BlogUtilsService } from '../../../services/blog-utils.service';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-deviantart-follow',
  templateUrl: './deviantart-follow.component.html',
  styleUrls: ['./deviantart-follow.component.scss']
})
export class DeviantArtFollowComponent implements OnInit {
  @Input() watchers: [DeviantWatcher];
  @Input() watchersMap: { [user: string] : DeviantWatcher } = {};

  @Input() watching: [DeviantFriend];
  @Input() watchingMap: { [user: string] : DeviantFriend } = {};

  @Output() followBlog = new EventEmitter<string>();
  @Output() unfollowBlog = new EventEmitter<string>();
  @Output() fetchNextWatchers = new EventEmitter<any>();
  @Output() fetchNextFriends = new EventEmitter<any>();

  @ViewChild('watchers', {static: false}) watcherContainer: ElementRef;
  @ViewChild('watching', {static: false}) watchingContainer: ElementRef;

  public mediaType = Media.DeviantArt;
  private userNearBottomWatchers = false;
  private userNearBottomWatching = false;

  /* Default user avatar. */
  public defaultAvatar = this.utils.getImagePath('deviant-avatar');

  constructor(private utils: UtilsService, public blogUtils: BlogUtilsService) { }

  ngOnInit() {
  }

  public getDAURL(username: string) {
    return 'http://' + username + '.deviantart.com';
  }

  /* If the user has scrolled to bottom, make a call for more watchers. */
  public onWatcherScroll(event: any) {
    this.userNearBottomWatchers = this.isUserNearBottom(this.watcherContainer);
    if (this.userNearBottomWatchers) {
      console.log("Time to get the next batch (watchers)!");
      this.fetchNextWatchers.emit();
    }
  }

  public onWatchingScroll(event: any) {
    this.userNearBottomWatching = this.isUserNearBottom(this.watchingContainer);
    if (this.userNearBottomWatching) {
      console.log("Time to get the next batch (watching)");
      this.fetchNextFriends.emit();
    }
  }

 /*
  * scrollTop: the number of pixels that an element's content is scrolled vertically (ex. how far down
  *   the scrollable region you have scrolled). When the element's content doesn't generate a vertical 
  *   scrollbar, then scrollTop = 0;
  * offsetHeight: an element's visible content & padding + border + scrollbar.
  *   It is a measurement of the height occupied by an element on the document.
  * clientHeight: visible content & padding (not including border, margin, or horizontal scrollbar).
  * scrollHeight: height of an element's content, including content not visible on the screen due to overflow.
  * 
  * see: https://stackoverflow.com/a/22675563 and https://stackoverflow.com/a/33189270
  */
  private isUserNearBottom(container: ElementRef): boolean {
    const threshold = 150;
    const position = container.nativeElement.scrollHeight - container.nativeElement.scrollTop;
    const height = container.nativeElement.clientHeight;
    console.log("Reload? ", position, height, position > height - threshold);
    return position < height + threshold;
  }

  /* Generic callback for when user clicks on a button in the blog component. */
  public onUserAction(action: UserMediaAction, deviant: string) {
    console.log("On user action: ", action, deviant);
    switch(action) {
      case UserMediaAction.Follow:
        this.followBlog.emit(deviant);
        break;
      case UserMediaAction.Unfollow:
        this.unfollowBlog.emit(deviant);
        break;
    }
  }
}
