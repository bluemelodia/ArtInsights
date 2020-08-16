import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchModule } from '../search/search.module';
import { BlogComponent } from './blog/blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { TumblrComponent } from './tumblr/tumblr.component';
import { TumblrFollowComponent } from './follow/tumblr-follow/tumblr-follow.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    BlogComponent,
    BlogListComponent,
    HomeComponent,
    TumblrComponent,
    TumblrFollowComponent
  ],
  imports: [
    CommonModule,
    SearchModule
  ]
})
export class HomeModule {}