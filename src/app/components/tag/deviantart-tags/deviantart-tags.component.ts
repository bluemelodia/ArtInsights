import { Component, OnInit, Input } from '@angular/core';
import { TaggedDeviation, DeviationEngagement } from '../../../types/tag.types';
import { BlogUtilsService } from '../../../services/blog-utils.service';
import { UtilsService } from '../../../services/utils.service';
import { StatService } from '../../../services/stat.service';

@Component({
  selector: 'app-deviantart-tags',
  templateUrl: './deviantart-tags.component.html',
  styleUrls: ['./deviantart-tags.component.scss']
})
export class DeviantartTagsComponent implements OnInit {
  @Input() set taggedDeviations(deviations: TaggedDeviation[]) {
    this.deviations = deviations;
    this.calculateStats();
  }

  public deviations: TaggedDeviation[] = [];
  public commentImg = this.utils.getImagePath('comment');
  public heartImg = this.utils.getImagePath('heart');

  public commentStats: DeviationEngagement;
  public favoriteStats: DeviationEngagement;

  constructor(
    public blogUtils: BlogUtilsService,
    private stat: StatService,
    private utils: UtilsService) { }

  ngOnInit() {
  }

  calculateStats() {
    let commentCounts: number[] = [];
    let faveCounts: number[] = [];

    console.log("Deviations: ", this.deviations);

    this.deviations.forEach((deviation) => {
      commentCounts.push(deviation.stats.comments);
      faveCounts.push(deviation.stats.favourites);
    });

    commentCounts.sort((a, b) => a - b);
    faveCounts.sort((a, b) => a - b);
    console.log("Comment counts: ", commentCounts);
    console.log("Fave counts: ", faveCounts);
    
    this.commentStats = {
      high: commentCounts[commentCounts.length - 1],
      low: commentCounts[0],
      average: this.stat.findAverage(faveCounts),
      median: this.stat.findMedian(commentCounts)
    };
    this.favoriteStats = {
      high: faveCounts[faveCounts.length - 1],
      low: faveCounts[0],
      average: this.stat.findAverage(faveCounts),
      median: this.stat.findMedian(faveCounts)
    };
  }
}
