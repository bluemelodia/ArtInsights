import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowComponent } from './follow/follow.component';
import { SearchModule } from '../search/search.module';
import { BlogComponent } from './blog/blog.component';
import { TumblrFollowComponent } from './follow/tumblr-follow/tumblr-follow.component';
import { BlogListComponent } from './blog-list/blog-list.component';

@NgModule({
  declarations: [
    FollowComponent,
    BlogComponent,
    BlogListComponent,
    TumblrFollowComponent
  ],
  imports: [
    CommonModule,
    SearchModule
  ]
})
export class FollowsModule {}
