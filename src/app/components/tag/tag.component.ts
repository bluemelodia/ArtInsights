import { Component, OnInit } from '@angular/core';
import { DeviantArtTagService } from '../../services/deviant-art-tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  constructor(private deviantTags: DeviantArtTagService) { }

  ngOnInit() {
  }

  public userSearchedTag(tag: string) {
    if (tag && tag.length > 0) {
      console.log("Search tag: ", tag);
      this.deviantTags.getDeviationsForTag(tag);
    }
  }
}
