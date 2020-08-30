import { Component, OnInit, Input } from '@angular/core';
import { TaggedDeviation } from '../../../types/tag.types';
import { BlogUtilsService } from '../../../services/blog-utils.service';

@Component({
  selector: 'app-deviantart-tags',
  templateUrl: './deviantart-tags.component.html',
  styleUrls: ['./deviantart-tags.component.scss']
})
export class DeviantartTagsComponent implements OnInit {
  @Input() deviations: TaggedDeviation[] = [];

  constructor(public blogUtils: BlogUtilsService) { }

  ngOnInit() {
  }

}
