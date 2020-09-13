import { Injectable } from '@angular/core';
import { DeviantArtAnalytics, DeviationStats } from '../types/tag.types';
import { DayOfWeek } from '../types/time.types';
import { Deviation, DeviantTag } from '../types/post.types';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private deviantArtAnalytics: DeviantArtAnalytics;

  constructor() { }

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
  }

  private compileDeviationStats(stats: DeviationStats, tags: (string | DeviantTag)[], time: string) {
    const date = new Date(parseInt(time) * 1000);
    const dayOfWeek = this.getDate(date);
    const timeOfDay = this.getTime(date);

    if (!this.deviantArtAnalytics.days[dayOfWeek]) {
      this.deviantArtAnalytics.days[dayOfWeek] = [];
    } else {
      this.deviantArtAnalytics.days[dayOfWeek].push(stats);
    }

    if (!this.deviantArtAnalytics.times[timeOfDay]) {
      this.deviantArtAnalytics.times[timeOfDay] = [];
    } else {
      this.deviantArtAnalytics.times[timeOfDay].push(stats);
    }

    tags.forEach((tag: string) => {
      if (!this.deviantArtAnalytics.tags[tag]) {
        this.deviantArtAnalytics[tag] = [];
      } else {
        this.deviantArtAnalytics[tag].push(stats);
      }
    });
    console.log("Analytics: ", this.deviantArtAnalytics);
  }

  getDate(date: Date): DayOfWeek {
    return date.getDay();
  }

  getTime(date: Date) {
    return date.getHours();
  }
}
