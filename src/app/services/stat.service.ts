import { Injectable } from '@angular/core';
import { TaggedDeviation, Engagement, TumblrTagResponse, TumblrEngagement, TagStat, TagAggregate, TaggedTweet, TwitterEngagement, HashTagAggregate } from '../types/tag.types';
import { Subject } from 'rxjs';
import { Media } from '../app.consts';
import { Hashtag } from '../types/twitter.types';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  private commentStats: Engagement;
  private favoriteStats: Engagement;

  private noteAndTagStats: TumblrEngagement;
  private tagStats: TagAggregate = {};

  private tweetStats: TwitterEngagement;
  private hashTagStats: HashTagAggregate = {};

  private commentSubjectDA$ = new Subject<Engagement>();
  private favoriteSubjectDA$ = new Subject<Engagement>();
  private tumblrSubject$ = new Subject<TumblrEngagement>();
  private twitterSubject$ = new Subject<TwitterEngagement>();

  constructor() {}

  public commentSubject$(media: Media) {
    switch (media) {
      case Media.DeviantArt:
        return this.commentSubjectDA$;
    }
  }

  public favoriteSubject$(media: Media): Subject<Engagement | TumblrEngagement | TwitterEngagement> {
    switch (media) {
      case Media.DeviantArt:
        return this.favoriteSubjectDA$;
      case Media.Tumblr:
        return this.tumblrSubject$;
      case Media.Twitter:
        return this.twitterSubject$;
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

  compileHashTags(hashtags: Hashtag[], faves: number, retweets: number) {
    for(let i = 0; i < hashtags.length; i++) {
      const tag = hashtags[i].toString();
      if (this.hashTagStats[tag]) {
        this.hashTagStats[tag].count++;
        this.hashTagStats[tag].totalFavorites += faves;
        this.hashTagStats[tag].totalRetweets += retweets;
      } else {
        this.hashTagStats[tag] = {
          count: 1, 
          favorites: [],
          totalFavorites: faves,
          retweets: [],
          totalRetweets: retweets
        };
      }
      this.hashTagStats[tag].favorites.push(faves);
      this.hashTagStats[tag].retweets.push(retweets);
      console.log("Hash tag stats: ", this.hashTagStats);
    }
  }

  /* Average out the tag engagement levels. */
  findTagEngagements() {
    const tumblrStats = {};
    Object.keys(this.tagStats).forEach((tag: string) => {
      const tagStat = this.tagStats[tag];
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

  findHashTagEngagements() {
    const twitterStats = {};
    Object.keys(this.hashTagStats).forEach((hashTag: string) => {
      const hashTagStat = this.hashTagStats[hashTag];
      console.log("HashTag stats: ", hashTagStat, hashTag);
      
      const faves: number[] = hashTagStat.favorites;
      faves.sort((a, b) => a - b);
      const retweets: number[] = hashTagStat.retweets;
      retweets.sort((a, b) => a - b);

      twitterStats[hashTag] = {
        favorites: {
          high: faves[faves.length - 1],
          low: faves[0],
          average: hashTagStat.totalFavorites / hashTagStat.count,
          median: this.findMedian(faves)
        },
        retweets: {
          high: retweets[retweets.length - 1],
          low: retweets[0],
          average: hashTagStat.totalRetweets / hashTagStat.count,
          median: this.findMedian(retweets)
        }
      }
    });
    return twitterStats;
  }

  public calculateDeviationStats(deviations: TaggedDeviation[]) {
    let commentCounts: number[] = [];
    let faveCounts: number[] = [];

    for(let i = 0; i < deviations.length; i++) {
      const deviation = deviations[i];
      commentCounts.push(deviation.stats.comments);
      faveCounts.push(deviation.stats.favourites);
    }

    commentCounts.sort((a, b) => a - b);
    faveCounts.sort((a, b) => a - b);

    this.commentStats = {
      high: commentCounts[commentCounts.length - 1],
      low: commentCounts[0],
      average: this.findAverage(commentCounts),
      median: this.findMedian(commentCounts)
    };
    this.commentSubject$(Media.DeviantArt).next(this.commentStats);

    this.favoriteStats = {
      high: faveCounts[faveCounts.length - 1],
      low: faveCounts[0],
      average: this.findAverage(faveCounts),
      median: this.findMedian(faveCounts)
    };
    this.favoriteSubject$(Media.DeviantArt).next(this.favoriteStats);
  }

  public calculateTwitterStats(tweets: TaggedTweet[]) {
    let favoriteCounts: number[] = [];
    let retweetCounts: number[] = [];
    this.hashTagStats = {};

    console.log("Twitter: ", tweets);

    for(let i = 0; i < tweets.length; i++) {
      const tweet: TaggedTweet = tweets[i];
      /* If the tweet has been retweeted, use the fields under the retweeted_status. */
      const favorites = tweet.retweeted_status ? tweet.retweeted_status.favorite_count : tweet.favorite_count;
      const retweets = tweet.retweeted_status ? tweet.retweeted_status.retweet_count : tweet.retweet_count;
      favoriteCounts.push(favorites);
      retweetCounts.push(retweets);

      /* Not all tweets will have hashtags, and the API will only count hashtags within the first 140 chars. */
      if ((tweet.retweeted_status && 
          tweet.retweeted_status.entities && 
          tweet.retweeted_status.entities.hashtags &&
          tweet.retweeted_status.entities.hashtags.length > 0) 
        || (tweet.entities && 
        tweet.entities.hashtags && 
        tweet.entities.hashtags.length > 0)) {
        const hashtags = tweet.retweeted_status ? tweet.retweeted_status.entities.hashtags : tweet.entities.hashtags;
        this.compileHashTags(hashtags, favorites, retweets);
      }
    }

    favoriteCounts.sort((a, b) => a - b);
    retweetCounts.sort((a, b) => a - b);
    console.log("Favorite counts: ", favoriteCounts);
    console.log("Retweet counts: ", retweetCounts);

    this.tweetStats = {
      favoriteStats: {
        high: favoriteCounts[favoriteCounts.length - 1],
        low: favoriteCounts[0],
        average: this.findAverage(favoriteCounts),
        median: this.findMedian(favoriteCounts)
      },
      retweetStats: {
        high: retweetCounts[retweetCounts.length - 1],
        low: retweetCounts[0],
        average: this.findAverage(retweetCounts),
        median: this.findMedian(retweetCounts)
      },
      hashtags: this.findHashTagEngagements()
    }
    console.log("Twitter stats: ", this.tweetStats);
    this.favoriteSubject$(Media.Twitter).next(this.tweetStats);
  }

  /* Calculations are an extension of DA's stats. */
  public calculateTumblrStats(tumblrPosts: TumblrTagResponse[]) {
    let noteCounts: number[] = [];
    this.tagStats = {};

    for(let i = 0; i < tumblrPosts.length; i++) {
      const tumblrPost: TumblrTagResponse = tumblrPosts[i];
      noteCounts.push(tumblrPost.note_count);
      this.compileTags(tumblrPost.tags, tumblrPost.note_count);
    }

    noteCounts.sort((a, b) => a - b);

    this.noteAndTagStats = {
      stats: {
        high: noteCounts[noteCounts.length - 1],
        low: noteCounts[0],
        average: this.findAverage(noteCounts),
        median: this.findMedian(noteCounts)
      },
      tags: this.findTagEngagements()
    }
    this.favoriteSubject$(Media.Tumblr).next(this.noteAndTagStats);
  }
}
