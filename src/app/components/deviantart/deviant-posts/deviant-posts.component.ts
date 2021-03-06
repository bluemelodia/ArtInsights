import { Component, OnInit, Input } from '@angular/core';
import { Deviation } from '../../../types/post.types';
import { BlogUtilsService } from '../../../services/blog-utils.service';
import { UtilsService } from '../../../services/utils.service';
import { Engagement } from '../../../types/shared.types';
import { DeviationAnalytics } from '../../../types/tag.types';
import { faveTiers, commentTiers, viewTiers } from '../../../app.consts';

@Component({
  selector: 'app-deviant-posts',
  templateUrl: './deviant-posts.component.html',
  styleUrls: ['./deviant-posts.component.scss']
})
export class DeviantPostsComponent implements OnInit {
    @Input() deviations: Deviation[];
    @Input() commentStats: Engagement;
    @Input() favoriteStats: Engagement;
    @Input() stats: DeviationAnalytics;

    public commentImg = this.utils.getImagePath('comment');
    public heartImg = this.utils.getImagePath('heart');
    public viewImg = this.utils.getImagePath('view');

    public viewTiers = viewTiers;
    public faveTiers = faveTiers;
    public commentTiers = commentTiers;

    constructor(public blogUtils: BlogUtilsService, private utils: UtilsService) {}

    ngOnInit() {

    }
}
