import { Component, OnInit } from '@angular/core';
import { TagService } from '../../services/tag.service';
import { Media, AlertType } from '../../app.consts';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { UserResponse } from '../../types/shared.types';
import { 
  DeviantArtTagResponse, 
  TaggedDeviation, 
  Engagement, 
  TumblrTagResponse, 
  TumblrEngagement, 
  TwitterTagResponse, 
  TaggedTweet, 
  TwitterEngagement } from '../../types/tag.types';
import { HashTag, TwitterMedia } from '../../types/twitter.types';
import { StatService } from '../../services/stat.service';
import { BlogUtilsService } from '../../services/blog-utils.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  public deviations: TaggedDeviation[] = [];
  public commentStatsDA: Engagement;
  public faveStatsDA: Engagement;
  public noMatchesMessage: string;

  public tumblrPosts: TumblrTagResponse[] = [];
  public tumblrStats: TumblrEngagement;
  public noTumblrPostsMessage: string;

  public twitterPosts: TaggedTweet[] = [];
  public twitterStats: TwitterEngagement;
  public noTweetsMessage: string;

  private tag = '';

  constructor(
    private blogUtils: BlogUtilsService,
    private tagService: TagService,
    private auth: AuthService,
    private alertService: AlertService,
    private stat: StatService
  ) { }

  ngOnInit() {
    this.setupSubscriptions();
  }

  /* As the deviations are fetched asynchronously, and we only want to calc the stats
   * after the entire batch has returned, subscribe to the comment/favorite subjects, 
   * whose values will be piped to listeners after the stats have been calculated. */
  private setupSubscriptions() {
    this.stat.commentSubject$(Media.DeviantArt)
    .subscribe((commentStats: Engagement) => {
      this.commentStatsDA = commentStats;
    });

    this.stat.favoriteSubject$(Media.DeviantArt)
    .subscribe((faveStats: Engagement) => {
      this.faveStatsDA = faveStats;
    });

    this.stat.favoriteSubject$(Media.Tumblr)
    .subscribe((tumblrStats: TumblrEngagement) => {
      this.tumblrStats = tumblrStats;
    });

    this.stat.favoriteSubject$(Media.Twitter)
    .subscribe((twitterStats: TwitterEngagement) => {
      this.twitterStats = twitterStats;
    });
  }

  public userSearchedTag(tag: string) {
    if (tag && tag.length > 0 && tag !== this.tag) {
      console.log("Search tag: ", tag);
      this.resetTagData();
      this.getTags(tag);
    }
  }

  private resetTagData() {
    this.deviations = [];
    this.commentStatsDA = null;
    this.faveStatsDA = null;
    this.noMatchesMessage = null;

    this.tumblrPosts = [];
    this.tumblrStats = null;
    this.noTumblrPostsMessage = null;

    this.twitterPosts = [];
    this.twitterStats = null;
    this.noTweetsMessage = null;
  }

  private getTags(tag: string) {
    this.getDATags(tag);
    this.getTumblrTags(tag);
    this.getTwitterTags(tag);
  }

  private getDATags(tag: string) {
    this.tagService.getDeviationsForTag(tag)
    .subscribe((taggedDeviations: UserResponse) => { 
      if (taggedDeviations.statusCode === 450) {
        this.auth.userUnauthForMedia(Media.DeviantArt);
      } else if (taggedDeviations.statusCode === -1) {
        this.alertService.showAlert(AlertType.Error, `Unable to fetch tagged deviations at this time, try again later.`);
        console.log(`Failed to fetch tagged deviations.`);
      } else  {
        console.log("Tagged deviations: ", taggedDeviations);
        const tagData = taggedDeviations.responseData as DeviantArtTagResponse;
        if (tagData.results && tagData.results.length > 0) {
          tagData.results.forEach((deviation: TaggedDeviation) => {
              /* Include visual art only - literature will not have image content. */
              if (deviation.content && deviation.content.src) {
                this.deviations.push(deviation);
              }
          });
          this.stat.calculateDeviationStats(this.deviations);
        } else {
          this.noMatchesMessage = 'No matching deviations were found.';
        }
      } 
    });
  }

  private getTumblrTags(tag: string) {
    this.tagService.getTumblrPostsForTag(tag)
    .subscribe((taggedPosts: UserResponse) => { 
      if (taggedPosts.statusCode === 450) {
        this.auth.userUnauthForMedia(Media.Tumblr);
      } else if (taggedPosts.statusCode === -1) {
        this.alertService.showAlert(AlertType.Error, `Unable to fetch tagged Tumblr posts at this time, try again later.`);
        console.log(`Failed to fetch tagged Tumblr posts.`);
      } else  {
        console.log("Tagged Tumblr posts: ", taggedPosts);
        const tagData = taggedPosts.responseData as [TumblrTagResponse];
        if (tagData && tagData.length > 0) {
          tagData.forEach((tumblrPost: TumblrTagResponse) => {
              /* Again filter for visual art. */
              if (tumblrPost.type === "photo") {
                /* First strip out the links from the caption. */
                tumblrPost.caption = this.blogUtils.stripLinks(tumblrPost.caption, '#74b9ff');
                this.tumblrPosts.push(tumblrPost);
              }
          });
          this.stat.calculateTumblrStats(this.tumblrPosts);
        } else {
          this.noTumblrPostsMessage = 'No matching deviations were found.';
        }
      } 
    });
  }

  /* No auth guards as we aren't using authenticated APIs for Twitter. */
  private getTwitterTags(tag: string) {
    this.tagService.getTwitterPostsForTag(tag)
      .subscribe((tweets: any) => {
        if (tweets.statusCode === -1) {
          this.alertService.showAlert(AlertType.Error, `Unable to fetch tweets at this time, try again later.`);
          console.log(`Failed to fetch tagged tweets.`);
        } else  {
          console.log("Tagged tweets: ", tweets);
          const tweetData = tweets.responseData as TwitterTagResponse;
          if (tweetData.statuses && tweetData.statuses.length > 0) {
            tweetData.statuses.forEach((tweet: TaggedTweet) => {
                console.log("Tweet: ", tweet);
                /* Do not count retweets. */
                if (!tweet.possibly_sensitive && !tweet.retweeted_status 
                    && tweet.entities.media && tweet.entities.media.length > 0) {
                  /* Focus on visual tweets. */
                  let hasPhotos = false;
                  tweet.entities.media.forEach((media) => {
                    console.log("Tweet media: ", media);
                    if (media.type === 'photo') {
                      hasPhotos = true;
                    }
                  });
                  if (hasPhotos) {
                    /* We don't need the indices, just extract the hashtags. */
                    let hashTags: string[] = [];
                    tweet.entities.hashtags.forEach((tag: HashTag) => {
                        hashTags.push(tag.text);
                      });
                    tweet.tags = hashTags;

                    /* For easier access, move photos in extended_entites into the entities section. */
                    if (tweet.extended_entities && tweet.extended_entities.media) {
                      let extendedMedia: TwitterMedia[] = [];
                      tweet.extended_entities.media.forEach((media) => {
                        if (media.type === 'photo') {
                          extendedMedia.push(media);
                        }
                      });
                      if (extendedMedia.length > 0) {
                        tweet.entities.media = extendedMedia;
                      }
                    }

                    this.twitterPosts.push(tweet);
                  }
                }
            });

            /* 
            * Since we do a lot of filtering for twitter posts, we need to check if we
            * have any tweets to show post-filter. 
            */
            if (this.twitterPosts.length < 1) {
              this.noTweetsMessage = 'No matching tweets were found.';
            } else {
              this.stat.calculateTwitterStats(this.twitterPosts);
            }
          }
        } 
      });
  }
}