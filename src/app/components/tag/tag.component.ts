import { Component, OnInit } from '@angular/core';
import { TagService } from '../../services/tag.service';
import { Media, AlertType, mediaData, navActions } from '../../app.consts';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { UserResponse, Engagement } from '../../types/shared.types';
import { 
  DeviantArtTagResponse, 
  TaggedDeviation, 
  TumblrTagResponse, 
  TumblrEngagement, 
  TwitterTagResponse, 
  TaggedTweet, 
  TwitterEngagement } from '../../types/tag.types';
import { HashTag, TwitterMedia } from '../../types/twitter.types';
import { StatService } from '../../services/stat.service';
import { LoginService } from '../../services/login.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { AuthStatus } from '../auth/auth.types';
import { UtilsService } from '../../services/utils.service';
import { Observable, ReplaySubject } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  private TumblrOAuth$: Observable<AuthStatus> = this.storage.tumblrOAuth$();
  private DeviantArtOAuth$: Observable<AuthStatus> = this.storage.deviantArtOAuth$();
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  public mediaData = mediaData;
  public deviantArt = Media.DeviantArt;
  public tumblr = Media.Tumblr;
  public navActions = navActions;
  public authSuccess = AuthStatus.Success;

  public mediaStatus = {};

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

  private currentTag = '';

  constructor(
    private auth: AuthService,
    private alert: AlertService,
    private loading: LoadingService,
    private login: LoginService,
    private router: Router,
    private stat: StatService,
    private storage: LocalStorageService,
    private tags: TagService,
    private utils: UtilsService
  ) {
    this.router.events
    .pipe(takeUntil(this.destroyed$))
    .subscribe(event => {
      if (event instanceof NavigationEnd && event.url === "/home/tags"){
        this.loading.hideLoader();
      }
  });
  }

  ngOnInit() {
    this.setupSubscriptions();

    Object.keys(mediaData).forEach((media) => {
      this.mediaStatus[media] = AuthStatus.Unattempted;
    });

    /* Subscribe to changes in social media auth status, and enable/disable the
     * navigation links accordingly. Twitter is always auth = true as only the 
     * public API is used. */
    this.TumblrOAuth$.subscribe((tumblrStatus: AuthStatus) => {
      this.mediaStatus[Media.Tumblr] = tumblrStatus;
      console.log("🎯 Tumblr status: ", this.mediaStatus);
    });

    this.DeviantArtOAuth$.subscribe((deviantArtStatus: AuthStatus) => {
      this.mediaStatus[Media.DeviantArt] = deviantArtStatus;
      console.log("🎯 DeviantArt status: ", this.mediaStatus);
    });

    this.mediaStatus[Media.Twitter] = AuthStatus.Success;
    console.log("🎯 Media status: ", this.mediaStatus);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  /* As the deviations are fetched asynchronously, and we only want to calc the stats
   * after the entire batch has returned, subscribe to the comment/favorite subjects, 
   * whose values will be piped to listeners after the stats have been calculated. */
  private setupSubscriptions() {
    this.stat.comment$(Media.DeviantArt)
    .subscribe((commentStats: Engagement) => {
      this.commentStatsDA = commentStats;
    });

    this.stat.favorite$(Media.DeviantArt)
    .subscribe((faveStats: Engagement) => {
      this.faveStatsDA = faveStats;
    });

    this.stat.favorite$(Media.Tumblr)
    .subscribe((tumblrStats: TumblrEngagement) => {
      this.tumblrStats = tumblrStats;
    });

    this.stat.favorite$(Media.Twitter)
    .subscribe((twitterStats: TwitterEngagement) => {
      this.twitterStats = twitterStats;
    });
  }

  public userSearchedTag(tag: string) {
    if (tag && tag.length > 0 && tag !== this.currentTag) {
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
    if (this.auth.isAuthorizedForMedia(Media.DeviantArt)) {
      this.getDATags(tag);
    }

    if (this.auth.isAuthorizedForMedia(Media.Tumblr)) {
      this.getTumblrTags(tag);
    }
    this.getTwitterTags(tag);
  }

  private getDATags(tag: string) {
    this.tags.getDeviationsForTag(tag)
    .subscribe((taggedDeviations: UserResponse) => { 
      if (taggedDeviations.statusCode === 401) {
        this.login.userNotAuthorizedToLogin();
      } else if (taggedDeviations.statusCode === 450) {
        this.auth.userUnauthForMedia(Media.DeviantArt);
      } else if (taggedDeviations.statusCode === -1) {
        this.alert.showAlert(AlertType.Error, `Unable to fetch tagged deviations at this time, try again later.`);
      } else  {
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
    this.tags.getTumblrPostsForTag(tag)
    .subscribe((taggedPosts: UserResponse) => { 
      if (taggedPosts.statusCode === 401) {
        this.login.userNotAuthorizedToLogin();
      } else if (taggedPosts.statusCode === 450) {
        this.auth.userUnauthForMedia(Media.Tumblr);
      } else if (taggedPosts.statusCode === -1) {
        this.alert.showAlert(AlertType.Error, `Unable to fetch tagged Tumblr posts at this time, try again later.`);
      } else  {
        const tagData = taggedPosts.responseData as [TumblrTagResponse];
        if (tagData && tagData.length > 0) {
          tagData.forEach((tumblrPost: TumblrTagResponse) => {
              /* Again filter for visual art. */
              if (tumblrPost.type === "photo") {
                /* First strip out the links from the caption. */
                tumblrPost.caption = this.utils.stripLinks(tumblrPost.caption);
                this.tumblrPosts.push(tumblrPost);
              }
          });
          this.stat.calculateTumblrStats(this.tumblrPosts);
        } else {
          this.noTumblrPostsMessage = 'No matching Tumblr posts were found.';
        }
      } 
    });
  }

  /* No auth guards as we aren't using authenticated APIs for Twitter. */
  private getTwitterTags(tag: string) {
    this.tags.getTwitterPostsForTag(tag)
      .subscribe((tweets: any) => {
        if (tweets.statusCode === -1) {
          this.alert.showAlert(AlertType.Error, `Unable to fetch tweets at this time, try again later.`);
        } else  {
          const tweetData = tweets.responseData as TwitterTagResponse;
          if (tweetData.statuses && tweetData.statuses.length > 0) {
            tweetData.statuses.forEach((tweet: TaggedTweet) => {
                /* Do not count retweets. */
                if (!tweet.possibly_sensitive && !tweet.retweeted_status 
                    && tweet.entities.media && tweet.entities.media.length > 0) {
                  /* Focus on visual tweets. */
                  let hasPhotos = false;
                  tweet.entities.media.forEach((media) => {
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