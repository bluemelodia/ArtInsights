import { Injectable } from '@angular/core';
import { TaggedDeviation, Engagement, TumblrTagResponse, TumblrEngagement, TagStat, TagAggregate } from '../types/tag.types';
import { Subject } from 'rxjs';
import { Media } from '../app.consts';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  private commentStats: Engagement;
  private favoriteStats: Engagement;
  private noteAndTagStats: TumblrEngagement;
  private tagStats: TagAggregate = {};

  private commentSubjectDA$ = new Subject<Engagement>();
  private favoriteSubjectDA$ = new Subject<Engagement>();
  private tumblrSubject$ = new Subject<TumblrEngagement>();

  constructor() {}

  public commentSubject$(media: Media) {
    switch (media) {
      case Media.DeviantArt:
        return this.commentSubjectDA$;
    }
  }

  public favoriteSubject$(media: Media): Subject<Engagement | TumblrEngagement> {
    switch (media) {
      case Media.DeviantArt:
        return this.favoriteSubjectDA$;
      case Media.Tumblr:
        return this.tumblrSubject$;
    }
  }

  findMedian(array: any[]) {
    if (array && array.length > 0) {
      const len = array.length;
      const mid = Math.floor(array.length / 2);
      if (array.length === 1) {
        return array[0];
      } else if (array.length % 2 === 0) {
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

  /* First count total engagement / usage for each tag. */
  compileTags(tags: string[], engagement: number) {
    for(let i = 0; i < tags.length; i++) {
      const tag = tags[i].toString();
      if (this.tagStats[tag]) {
        this.tagStats[tag].count++;
        this.tagStats[tag].totalEngagements += engagement;
      } else {
        this.tagStats[tag] = {
          count: 1, 
          totalEngagements: engagement,
          engagements: []
        };
      }
      this.tagStats[tag].engagements.push(engagement);
    }
  }

  /* Average out the tag engagement levels. */
  findTagEngagements() {
    const tumblrStats = {};
    Object.keys(this.tagStats).forEach((tag: string) => {
      const tagStat = this.tagStats[tag];
      console.log("Tag stats: ", tagStat, tag);
      const engagements: number[] = tagStat.engagements;
      engagements.sort((a, b) => a - b);
      tumblrStats[tag] = {
        high: engagements[engagements.length - 1],
        low: engagements[0],
        average: tagStat.totalEngagements / tagStat.count,
        median: this.findMedian(engagements)
      }
    });
    return tumblrStats;
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

  /* Calculations are an extension of DA's stats. */
  public calculateTumblrStats(tumblrPosts: TumblrTagResponse[]) {
    let noteCounts: number[] = [];
    this.tagStats = {};

    console.log("Tumblr: ", tumblrPosts);

    for(let i = 0; i < tumblrPosts.length; i++) {
      const tumblrPost: TumblrTagResponse = tumblrPosts[i];
      noteCounts.push(tumblrPost.note_count);
      this.compileTags(tumblrPost.tags, tumblrPost.note_count);
    }

    noteCounts.sort((a, b) => a - b);
    console.log("Note counts: ", noteCounts);

    this.noteAndTagStats = {
      stats: {
        high: noteCounts[noteCounts.length - 1],
        low: noteCounts[0],
        average: this.findAverage(noteCounts),
        median: this.findMedian(noteCounts)
      },
      tags: this.findTagEngagements()
    }
    console.log("Tumblr stats: ", this.noteAndTagStats);
    this.favoriteSubject$(Media.Tumblr).next(this.noteAndTagStats);
  }
}
