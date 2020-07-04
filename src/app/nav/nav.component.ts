import { Component, OnInit } from '@angular/core';
import { mediaData } from '../app.consts';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public mediaData = mediaData;

  constructor() { }

  ngOnInit(): void {
    console.log("MEDIAS: ", this.mediaData);
  }
}
