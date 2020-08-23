import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DeviantWatcher } from '../../../types/deviant.types';
import { Media, UserMediaAction } from '../../../app.consts';
import { BlogUtilsService } from '../../../services/blog-utils.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

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
  @Output() getNextWatchers = new EventEmitter<any>();

  @ViewChild('scroll', {static: false}) scrollContainer: ElementRef;

  public mediaType = Media.DeviantArt;
  private userNearBottom = false;

  constructor(public blogUtils: BlogUtilsService) { }

  ngOnInit() {
  }

  public getDAURL(username: string) {
    return 'http://' + username + '.deviantart.com';
  }

  /* If the user has scrolled to bottom, make a call for more watchers. */
  public onScroll(event: any) {
    this.userNearBottom = this.isUserNearBottom();
    if (this.userNearBottom) {
      console.log("Time to get the next batch!");
      this.getNextWatchers.emit();
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
  private isUserNearBottom(): boolean {
    const threshold = 50;
    const position = this.scrollContainer.nativeElement.scrollHeight - this.scrollContainer.nativeElement.scrollTop;
    const height = this.scrollContainer.nativeElement.clientHeight;
    console.log("Reload? ", position, height, position > height - threshold);
    return position > height - threshold;
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
