import { Component, OnInit } from '@angular/core';
import { DeviantArtTagService } from '../../services/deviant-art-tag.service';
import { Media, AlertType } from '../../app.consts';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { UserResponse } from '../../types/shared.types';
import { DeviantArtTagResponse, TaggedDeviation, DeviationEngagement } from '../../types/tag.types';
import { StatService } from '../../services/stat.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  public deviations: TaggedDeviation[] = [];
  public commentStatsDA: DeviationEngagement;
  public faveStatsDA: DeviationEngagement;

  private tag = '';

  constructor(
    private deviantTags: DeviantArtTagService,
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
    .subscribe((commentStats: DeviationEngagement) => {
      this.commentStatsDA = commentStats;
    });

    this.stat.favoriteSubject$(Media.DeviantArt)
    .subscribe((faveStats: DeviationEngagement) => {
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
  }

  private getTags(tag: string) {
    this.getDATags(tag);
  }

  private getDATags(tag: string) {
    this.deviantTags.getDeviationsForTag(tag)
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
              this.deviations.push(deviation);
          });
          this.stat.calculateDeviationStats(this.deviations);
        }
      }
    });
  }
}