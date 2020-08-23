import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviantArtComponent } from './deviantart.component';
import { DeviantArtFollowComponent } from './deviantart-follow/deviantart-follow.component';
import { DeviantComponent } from './deviant/deviant.component';
import { BlogModule } from '../blog/blog.module';


@NgModule({
  declarations: [
    DeviantComponent,
    DeviantArtComponent,
    DeviantArtFollowComponent
  ],
  imports: [
    CommonModule,
    BlogModule
  ]
})
export class DeviantArtModule {}