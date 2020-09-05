import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TagComponent } from './tag.component';
import { DeviantartTagsComponent } from './deviantart-tags/deviantart-tags.component';
import { SearchModule } from '../search/search.module';
import { TumblrTagsComponent } from './tumblr-tags/tumblr-tags.component';
import { TwitterTagsComponent } from './twitter-tags/twitter-tags.component';

@NgModule({
  declarations: [
    TagComponent,
    DeviantartTagsComponent,
    TumblrTagsComponent,
    TwitterTagsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SearchModule
  ]
})
export class TagModule {}