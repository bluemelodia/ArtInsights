import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TumblrComponent } from './tumblr.component';
import { TumblrFollowComponent } from './tumblr-follow/tumblr-follow.component';
import { TumblrBlogListComponent } from './blog-list/blog-list.component';
import { BlogModule } from '../blog/blog.module';
import { TumblrPostsComponent } from './tumblr-posts/tumblr-posts.component';

@NgModule({
  declarations: [
    TumblrComponent,
    TumblrFollowComponent,
    TumblrBlogListComponent,
    TumblrPostsComponent
  ],
  imports: [
    CommonModule,
    BlogModule
  ]
})
export class TumblrModule {}