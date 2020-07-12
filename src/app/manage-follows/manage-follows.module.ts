import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowComponent } from './follow/follow.component';
import { SearchModule } from '../search/search.module';
import { BlogComponent } from './blog/blog.component';
import { FollowerComponent } from './follower/follower.component';
import { FollowingComponent } from './following/following.component';

@NgModule({
  declarations: [
    FollowComponent,
    BlogComponent,
    FollowerComponent,
    FollowingComponent
  ],
  imports: [
    CommonModule,
    SearchModule
  ]
})
export class ManageFollowsModule {}
