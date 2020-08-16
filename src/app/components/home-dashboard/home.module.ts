import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { SearchModule } from '../search/search.module';
import { BlogComponent } from './blog/blog.component';
import { TumblrFollowComponent } from './home/tumblr-follow/tumblr-follow.component';
import { BlogListComponent } from './blog-list/blog-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    BlogComponent,
    BlogListComponent,
    TumblrFollowComponent
  ],
  imports: [
    CommonModule,
    SearchModule
  ]
})
export class HomeModule {}
