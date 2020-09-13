import { Injectable } from '@angular/core';
import { DeviantArtAnalytics, DeviationStats } from '../types/tag.types';
import { DayOfWeek } from '../types/time.types';
import { Deviation, DeviantTag } from '../types/post.types';
import { StatService } from './stat.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private deviantArtAnalytics: DeviantArtAnalytics;

  constructor(private stat: StatService) { }

  public analyzeDeviations(deviations: Deviation[]) {
    this.deviantArtAnalytics = {
      tags: {},
      days: {},
      times: {}
    };

    deviations.forEach((deviation) => {
      this.compileDeviationStats(deviation.stats, deviation.tags, deviation.published_time);
    });
    console.log("Analytics so far: ", this.deviantArtAnalytics);

    /* Average out all the analytics. */
    return this.computeDeviationStats();
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

    if (!this.deviantArtAnalytics.times[timeOfDay]) {
      this.deviantArtAnalytics.times[timeOfDay] = {
        views: [],
        favorites: [],
        comments: []
      };
    }
    this.deviantArtAnalytics.times[timeOfDay].views.push(stats.views);
    this.deviantArtAnalytics.times[timeOfDay].favorites.push(stats.favourites);
    this.deviantArtAnalytics.times[timeOfDay].comments.push(stats.comments);

    tags.forEach((tag: string) => {
      if (!this.deviantArtAnalytics.tags[tag]) {
        this.deviantArtAnalytics[tag] = {
          views: [],
          favorites: [],
          comments: []
        };
      } 
      this.deviantArtAnalytics[tag].views.push(stats.views);
      this.deviantArtAnalytics[tag].favorites.push(stats.favourites);
      this.deviantArtAnalytics[tag].comments.push(stats.comments);
    });
    console.log("Analytics: ", this.deviantArtAnalytics);
  }

  private computeDeviationStats() {
    const artStats = {
      tags: {},
      days: {},
      times: {}
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

    Object.keys(this.deviantArtAnalytics.times).forEach((time: string) => {
      const timeStat = this.deviantArtAnalytics.times[time];
      const stats = this.getStatistics(timeStat.views, timeStat.favorites, timeStat.comments);
      artStats.times[time] = stats;
    });
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
}
