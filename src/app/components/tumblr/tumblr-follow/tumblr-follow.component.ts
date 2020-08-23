import { Component, EventEmitter, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { TumblrUser, TumblrBlog } from '../../../types/tumblr.types';
import { Media, UserMediaAction } from '../../../app.consts';
import { BlogUtilsService } from '../../../services/blog-utils.service';


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
  @Output() fetchMoreFollowers = new EventEmitter<any>();
  @Output() fetchMoreFollowing = new EventEmitter<any>();

  @ViewChild('followers', {static: false}) followerScroll: ElementRef;
  @ViewChild('following', {static: false}) followingScroll: ElementRef;

  public mediaType = Media.Tumblr;
  private userNearBottomFollowers = false;
  private userNearBottomFollowing = false;

  constructor(public blogUtils: BlogUtilsService) { }

  ngOnInit() {
  }

  /* If the user has scrolled to bottom, make a call for more watchers. */
  public onFollowerScroll(event: any) {
    this.userNearBottomFollowers = this.isUserNearBottom(this.followerScroll);
    if (this.userNearBottomFollowers) {
      console.log("Time to get the next batch!");
      this.fetchMoreFollowers.emit();
    }
  }

  public onFollowingScroll(event: any) {
    this.userNearBottomFollowing = this.isUserNearBottom(this.followingScroll);
    if (this.userNearBottomFollowing) {
      console.log("Time to get the next batch!");
      this.fetchMoreFollowing.emit();
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
