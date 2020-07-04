import { Component, OnInit } from '@angular/core';
import { mediaData, mediaActions } from '../app.consts';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public mediaData = mediaData;
  public mediaActions = mediaActions;

  constructor() { }

  ngOnInit(): void {
  }
}
