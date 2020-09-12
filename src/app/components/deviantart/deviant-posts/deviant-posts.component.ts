import { Component, OnInit, Input } from '@angular/core';
import { Deviation } from '../../../types/post.types';

@Component({
  selector: 'app-deviant-posts',
  templateUrl: './deviant-posts.component.html',
  styleUrls: ['./deviant-posts.component.scss']
})
export class DeviantPostsComponent implements OnInit {
    @Input() deviations: Deviation[];

    constructor() {}

    ngOnInit() {

    }
}
