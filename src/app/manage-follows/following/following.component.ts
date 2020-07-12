import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  @Input() followsYou: boolean;

  constructor() { }

  ngOnInit() {
  }

}
