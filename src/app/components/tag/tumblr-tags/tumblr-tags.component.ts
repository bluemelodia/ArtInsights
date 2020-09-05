import { Component, OnInit, Input } from '@angular/core';
import { TumblrTagResponse, TumblrEngagement } from '../../../types/tag.types';
import { UtilsService } from '../../../services/utils.service';
import { BlogUtilsService } from '../../../services/blog-utils.service';

@Component({
  selector: 'app-tumblr-tags',
  templateUrl: './tumblr-tags.component.html',
  styleUrls: ['./tumblr-tags.component.scss']
})
export class TumblrTagsComponent implements OnInit {
  @Input() posts: TumblrTagResponse[] = [];
  @Input() engagement: TumblrEngagement;

  @Input() noMatchesMessage: string;

  public commentImg = this.utils.getImagePath('comment');
  public heartImg = this.utils.getImagePath('heart');
  public defaultMessage = 'Type in a tag name to search for matching posts.';

  constructor(
    public blogUtils: BlogUtilsService,
    private utils: UtilsService) { }

  ngOnInit() {
  }

}
