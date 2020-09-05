import { Component, OnInit } from '@angular/core';
import { TagService } from '../../services/deviant-art-tag.service';
import { Media, AlertType } from '../../app.consts';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { UserResponse } from '../../types/shared.types';
import { DeviantArtTagResponse, TaggedDeviation, Engagement, TumblrTagResponse } from '../../types/tag.types';
import { StatService } from '../../services/stat.service';

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
  public noTumblrPostsMessage: string;

  private tag = '';

  constructor(
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
  }

  private getTags(tag: string) {
    this.getDATags(tag);
    this.getTumblrTags(tag);
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
}