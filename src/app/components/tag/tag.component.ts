import { Component, OnInit } from '@angular/core';
import { DeviantArtTagService } from '../../services/deviant-art-tag.service';
import { Media, AlertType } from '../../app.consts';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  constructor(
    private deviantTags: DeviantArtTagService,
    private auth: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  public userSearchedTag(tag: string) {
    if (tag && tag.length > 0) {
      console.log("Search tag: ", tag);
      this.deviantTags.getDeviationsForTag(tag)
        .subscribe((taggedDeviations: any) => { 
          if (taggedDeviations.statusCode === 450) {
            this.auth.userUnauthForMedia(Media.DeviantArt);
          } else if (taggedDeviations.statusCode === -1) {
            this.alertService.showAlert(AlertType.Error, `Unable to fetch tagged deviations at this time, try again later.`);
            console.log(`Failed to fetch tagged deviations.`);
          } else  {
            console.log("Watchers: ", taggedDeviations);
            const responseData = taggedDeviations.responseData as any;
          }
        })
    }
  }
}
