import { Component, OnInit } from '@angular/core';
import { FollowService } from '../follow.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnInit {
  constructor(followService: FollowService) { }

  ngOnInit() {
  }
}
