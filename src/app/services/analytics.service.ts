import { Injectable } from '@angular/core';
import { DeviationTotalStats, DeviationAnalytics, DeviationStats } from '../types/tag.types';
import { DayOfWeek } from '../types/time.types';
import { Deviation, DeviantTag } from '../types/post.types';
import { StatService } from './stat.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private deviantArtAnalytics: DeviationTotalStats;
  private deviationSubject$ = new Subject<DeviationAnalytics>();

  constructor(private stat: StatService) { }

  public deviationSubject(): Observable<DeviationAnalytics> {
    return this.deviationSubject$.asObservable();
  }

  public analyzeDeviations(deviations: Deviation[]) {
    this.deviantArtAnalytics = {
      tags: {},
      days: {},
      faveTimes: this.createTimeStruct(),
      viewTimes: this.createTimeStruct(),
      commentTimes: this.createTimeStruct()
    };

    deviations.forEach((deviation) => {
      this.compileDeviationStats(deviation.stats, deviation.tags, deviation.published_time);
    });

    /* Average out all the analytics. */
    return this.deviationSubject$.next(this.computeDeviationStats());
  }

  private compileDeviationStats(stats: DeviationStats, tags: (string | DeviantTag)[], time: string) {
    const date = new Date(parseInt(time) * 1000);
    const dayOfWeek = this.getDate(date);
    const timeOfDay = this.getTime(date);

    if (!this.deviantArtAnalytics.days[dayOfWeek]) {
      this.deviantArtAnalytics.days[dayOfWeek] = {
        views: [],
        favorites: [],
        comments: []
      };
    } 
    this.deviantArtAnalytics.days[dayOfWeek].views.push(stats.views);
    this.deviantArtAnalytics.days[dayOfWeek].favorites.push(stats.favourites);
    this.deviantArtAnalytics.days[dayOfWeek].comments.push(stats.comments);

    const commentTimes = this.deviantArtAnalytics.commentTimes[dayOfWeek];
    const viewTimes = this.deviantArtAnalytics.viewTimes[dayOfWeek];
    const faveTimes = this.deviantArtAnalytics.faveTimes[dayOfWeek];

    if (!commentTimes[timeOfDay]) {
      commentTimes[timeOfDay] = [];
    }

    if (!viewTimes[timeOfDay]) {
      viewTimes[timeOfDay] = [];
    }

    if (!faveTimes[timeOfDay]) {
      faveTimes[timeOfDay] = [];
    }

    commentTimes[timeOfDay].push(stats.comments);
    viewTimes[timeOfDay].push(stats.views);
    faveTimes[timeOfDay].push(stats.favourites);

    tags.forEach((tag: string) => {
      if (!this.deviantArtAnalytics.tags[tag]) {
        this.deviantArtAnalytics.tags[tag] = {
          views: [],
          favorites: [],
          comments: []
        };
      } 
      this.deviantArtAnalytics.tags[tag].views.push(stats.views);
      this.deviantArtAnalytics.tags[tag].favorites.push(stats.favourites);
      this.deviantArtAnalytics.tags[tag].comments.push(stats.comments);
    });
  }

  private computeDeviationStats(): DeviationAnalytics {
    const artStats = {
      tags: {},
      days: {},
      commentTimes: {},
      viewTimes: {},
      faveTimes: {}
    };
    Object.keys(this.deviantArtAnalytics.tags).forEach((tag: string) => {
      const tagStat = this.deviantArtAnalytics.tags[tag];
      const stats = this.getStatistics(tagStat.views, tagStat.favorites, tagStat.comments);
      artStats.tags[tag] = stats;
    });

    Object.keys(this.deviantArtAnalytics.days).forEach((day: string) => {
      const dayStat = this.deviantArtAnalytics.days[day];
      const stats = this.getStatistics(dayStat.views, dayStat.favorites, dayStat.comments);
      artStats.days[day] = stats;
    });

    artStats.commentTimes = this.createTimeStruct();
    artStats.faveTimes = this.createTimeStruct();
    artStats.viewTimes = this.createTimeStruct();

    /* Average out the times. */
    for(let i = 0; i <= 6; i++) {
      const comments = this.deviantArtAnalytics.commentTimes[i];
      const faves = this.deviantArtAnalytics.faveTimes[i];
      const views = this.deviantArtAnalytics.viewTimes[i];

      for(let j = 0; j <= 23; j++) {
        if (comments[j] && comments[j].length > 0) {
          artStats.commentTimes[i][j] = comments[j].reduce(this.sum, 0) / comments[j].length;
        }

        if (faves[j] && faves[j].length > 0) {
          artStats.faveTimes[i][j] = faves[j].reduce(this.sum, 0) / faves[j].length;
        }

        if (views[j] && views[j].length > 0) {
          artStats.viewTimes[i][j] = views[j].reduce(this.sum, 0) / views[j].length;
        }
      }
    }

    return artStats;
  }

  private getStatistics(views: number[], faves: number[], comments: number[]) {
    views.sort((a, b) => a - b);
    faves.sort((a, b) => a - b);  
    comments.sort((a, b) => a - b);

    return {
      views: {
        high: views[views.length - 1],
        low: views[0],
        average: views.reduce(this.sum, 0) / (Math.round(views.length * 100)/100),
        median: this.stat.findMedian(views)
      },
      favorites: {
        high: faves[faves.length - 1],
        low: faves[0],
        average: faves.reduce(this.sum, 0) / (Math.round(faves.length * 100)/100),
        median: this.stat.findMedian(faves)
      },
      comment: {
        high: comments[comments.length - 1],
        low: comments[0],
        average: comments.reduce(this.sum, 0) / (Math.round(comments.length * 100)/100),
        median: this.stat.findMedian(comments)
      }
    };
  }

  private sum(cur: number, acc: number) {
    return cur + acc;
  }

  getDate(date: Date): DayOfWeek {
    return date.getDay();
  }

  getTime(date: Date) {
    return date.getHours();
  }

  createTimeStruct() {
    return {
      [DayOfWeek.Sunday]: {},
      [DayOfWeek.Monday]: {},
      [DayOfWeek.Tuesday]: {},
      [DayOfWeek.Wednesday]: {},
      [DayOfWeek.Thursday]: {},
      [DayOfWeek.Friday]: {},
      [DayOfWeek.Saturday]: {}
    };
  }
}
