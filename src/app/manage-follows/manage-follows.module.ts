import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowComponent } from './follow/follow.component';
import { SearchModule } from '../search/search.module';
import { BlogComponent } from './blog/blog.component';

@NgModule({
  declarations: [
    FollowComponent,
    BlogComponent
  ],
  imports: [
    CommonModule,
    SearchModule
  ]
})
export class ManageFollowsModule {}
