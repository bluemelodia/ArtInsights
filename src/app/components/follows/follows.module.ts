import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowComponent } from './follow/follow.component';
import { SearchModule } from '../search/search.module';
import { BlogComponent } from './blog/blog.component';
import { TumblrFollowComponent } from './follow/tumblr-follow/tumblr-follow.component';

@NgModule({
  declarations: [
    FollowComponent,
    BlogComponent,
    TumblrFollowComponent
  ],
  imports: [
    CommonModule,
    SearchModule
  ]
})
export class FollowsModule {}
