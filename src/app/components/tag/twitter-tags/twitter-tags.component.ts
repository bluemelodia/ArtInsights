import { Component, OnInit, Input } from '@angular/core';
import { BlogUtilsService } from '../../../services/blog-utils.service';
import { UtilsService } from '../../../services/utils.service';
import { TwitterEngagement, TaggedTweet } from '../../../types/tag.types';

@Component({
  selector: 'app-twitter-tags',
  templateUrl: './twitter-tags.component.html',
  styleUrls: ['./twitter-tags.component.scss']
})
export class TwitterTagsComponent implements OnInit {
  @Input() tweets: TaggedTweet[] = [];
  @Input() engagement: TwitterEngagement;
  @Input() noMatchesMessage: string;

  public heartImg = this.utils.getImagePath('heart');
  public retweetImg = this.utils.getImagePath('retweet');
  public tagImg = this.utils.getImagePath('tag');
  public defaultMessage = 'Type in a tag name to search for matching tweets.';

  constructor(
    public blogUtils: BlogUtilsService,
    private utils: UtilsService) { }

  ngOnInit() {
  }
}
