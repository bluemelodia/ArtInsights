import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviantArtComponent } from './deviantart.component';
import { DeviantArtFollowComponent } from './deviantart-follow/deviantart-follow.component';
import { DeviantComponent } from './deviant/deviant.component';
import { BlogModule } from '../blog/blog.module';
import { DeviantPostsComponent } from './deviant-posts/deviant-posts.component';
import { PipeModule } from '../../pipes/pipe.module';
import { HeatmapModule } from '../heatmap/heatmap.module';

@NgModule({
  declarations: [
    DeviantComponent,
    DeviantArtComponent,
    DeviantArtFollowComponent,
    DeviantPostsComponent
  ],
  imports: [
    CommonModule,
    BlogModule,
    HeatmapModule,
    PipeModule
  ]
})
export class DeviantArtModule {}