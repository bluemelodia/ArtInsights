import { Component, OnInit, Input } from '@angular/core';
import { TumblrTagResponse, Engagement } from '../../../types/tag.types';

@Component({
  selector: 'app-tumblr-tags',
  templateUrl: './tumblr-tags.component.html',
  styleUrls: ['./tumblr-tags.component.scss']
})
export class TumblrTagsComponent implements OnInit {
  @Input() posts: TumblrTagResponse[] = [];
  @Input() commentStats: Engagement;
  @Input() favoriteStats: Engagement;

  @Input() noMatchesMessage: string;

  constructor() { }

  ngOnInit() {
  }

}
