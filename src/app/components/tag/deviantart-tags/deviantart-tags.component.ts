import { Component, OnInit, Input } from '@angular/core';
import { TaggedDeviation } from '../../../types/tag.types';
import { BlogUtilsService } from '../../../services/blog-utils.service';
import { UtilsService } from '../../../services/utils.service';
import { utils } from 'protractor';

@Component({
  selector: 'app-deviantart-tags',
  templateUrl: './deviantart-tags.component.html',
  styleUrls: ['./deviantart-tags.component.scss']
})
export class DeviantartTagsComponent implements OnInit {
  @Input() deviations: TaggedDeviation[] = [];

  public commentImg = this.utils.getImagePath('comment');
  public heartImg = this.utils.getImagePath('heart');

  constructor(
    public blogUtils: BlogUtilsService,
    private utils: UtilsService) { }

  ngOnInit() {
  }

}
