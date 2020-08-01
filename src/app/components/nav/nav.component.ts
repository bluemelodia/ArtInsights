import { Component, OnInit } from '@angular/core';
import { mediaData, navActions } from '../../app.consts';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public mediaData = mediaData;
  public navActions = navActions;

  constructor() { }

  ngOnInit(): void {
  }
}
