import { Component, OnInit, Input } from '@angular/core';
import { Deviation } from '../../../types/post.types';
import { BlogUtilsService } from '../../../services/blog-utils.service';

@Component({
  selector: 'app-deviant-posts',
  templateUrl: './deviant-posts.component.html',
  styleUrls: ['./deviant-posts.component.scss']
})
export class DeviantPostsComponent implements OnInit {
    @Input() deviations: Deviation[];

    constructor(public blogUtils: BlogUtilsService) {}

    ngOnInit() {

    }
}
