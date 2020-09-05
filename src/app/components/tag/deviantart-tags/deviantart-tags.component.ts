import { Component, OnInit, Input } from '@angular/core';
import { TaggedDeviation, Engagement } from '../../../types/tag.types';
import { BlogUtilsService } from '../../../services/blog-utils.service';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-deviantart-tags',
  templateUrl: './deviantart-tags.component.html',
  styleUrls: ['./deviantart-tags.component.scss']
})
export class DeviantartTagsComponent implements OnInit {
  @Input() deviations: TaggedDeviation[] = [];
  @Input() commentStats: Engagement;
  @Input() favoriteStats: Engagement;

  @Input() noMatchesMessage: string;

  public commentImg = this.utils.getImagePath('comment');
  public heartImg = this.utils.getImagePath('heart');
  public defaultMessage = 'Type in a tag name to search for matching deviations.';

  constructor(
    public blogUtils: BlogUtilsService,
    private utils: UtilsService) { }

  ngOnInit() {
  }
}
