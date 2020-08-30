import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TagComponent } from './tag.component';
import { DeviantartTagsComponent } from './deviantart-tags/deviantart-tags.component';
import { SearchModule } from '../search/search.module';

@NgModule({
  declarations: [
    TagComponent,
    DeviantartTagsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SearchModule
  ]
})
export class TagModule {}