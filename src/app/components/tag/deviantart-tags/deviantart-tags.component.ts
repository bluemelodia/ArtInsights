import { Component, OnInit, Input } from '@angular/core';
import { TaggedDeviation } from '../../../types/tag.types';

@Component({
  selector: 'app-deviantart-tags',
  templateUrl: './deviantart-tags.component.html',
  styleUrls: ['./deviantart-tags.component.scss']
})
export class DeviantartTagsComponent implements OnInit {
  @Input() deviations: TaggedDeviation[] = [];

  constructor() { }

  ngOnInit() {
  }

}
