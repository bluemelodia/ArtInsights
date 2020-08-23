import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { BlogUtilsService } from '../../../services/blog-utils.service';
import { DeviantData } from '../../../types/deviant.types';

@Component({
  selector: 'app-deviant',
  templateUrl: './deviant.component.html',
  styleUrls: ['./deviant.component.scss']
})
export class DeviantComponent implements OnInit {
@Input() set deviant(data: DeviantData) {
  this.daURL = `https://${data.username}.deviantArt.com`;
  this.daUser = data;
}

public daUser: DeviantData;
public daURL = '';

 /* Default user avatar. */
 public defaultAvatar = this.utils.getImagePath('deviant-avatar');

 constructor(private utils: UtilsService, public blogUtils: BlogUtilsService) { }

 ngOnInit() {
 }
}