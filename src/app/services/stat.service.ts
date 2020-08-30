import { Injectable } from '@angular/core';
import { TaggedDeviation, DeviationEngagement } from '../types/tag.types';
import { Subject } from 'rxjs';
import { Media } from '../app.consts';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  private commentStats: DeviationEngagement;
  private favoriteStats: DeviationEngagement;

  private commentSubjectDA$ = new Subject<DeviationEngagement>();
  private favoriteSubjectDA$ = new Subject<DeviationEngagement>();

  constructor() {}

  public commentSubject$(media: Media) {
    switch (media) {
      case Media.DeviantArt:
        return this.commentSubjectDA$;
    }
  }

  public favoriteSubject$(media: Media) {
    switch (media) {
      case Media.DeviantArt:
        return this.favoriteSubjectDA$;
    }
  }

  findMedian(array: any[]) {
    if (array && array.length > 0) {
      const len = array.length;
      const mid = Math.floor(array.length / 2);
      if (array.length % 2 === 0) {
        return array[mid];
      } else {
        return (array[mid - 1] + array[mid])/2;
      }
    }
  }

  findAverage(array: number[]) {
    let sum = 0;
    array.forEach(num => {
      sum += num;
    });
    return sum/array.length;
  }

  public calculateDeviationStats(deviations: TaggedDeviation[]) {
    let commentCounts: number[] = [];
    let faveCounts: number[] = [];

    console.log("Deviations: ", deviations);

    for(let i = 0; i < deviations.length; i++) {
      const deviation = deviations[i];
      console.log("Deviation: ", deviation, deviation.stats);
      commentCounts.push(deviation.stats.comments);
      faveCounts.push(deviation.stats.favourites);
    }

    console.log("Comment counts before sort: ", commentCounts);
    console.log("Fave counts after sort: ", faveCounts);

    commentCounts.sort((a, b) => a - b);
    faveCounts.sort((a, b) => a - b);
    console.log("Comment counts: ", commentCounts);
    console.log("Fave counts: ", faveCounts);

    this.commentStats = {
      high: commentCounts[commentCounts.length - 1],
      low: commentCounts[0],
      average: this.findAverage(commentCounts),
      median: this.findMedian(commentCounts)
    };
    console.log("Comment stats: ", this.commentStats);
    this.commentSubject$(Media.DeviantArt).next(this.commentStats);

    this.favoriteStats = {
      high: faveCounts[faveCounts.length - 1],
      low: faveCounts[0],
      average: this.findAverage(faveCounts),
      median: this.findMedian(faveCounts)
    };
    console.log("Favorite stats: ", this.favoriteStats);
    this.favoriteSubject$(Media.DeviantArt).next(this.favoriteStats);
  }
}
