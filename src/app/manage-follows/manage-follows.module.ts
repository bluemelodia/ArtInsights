import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowComponent } from './follow/follow.component';
import { SearchModule } from '../search/search.module';

@NgModule({
  declarations: [
    FollowComponent
  ],
  imports: [
    CommonModule,
    SearchModule
  ]
})
export class ManageFollowsModule {}
