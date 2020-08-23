import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviantArtComponent } from './deviantart.component';
import { DeviantArtFollowComponent } from './deviantart-follow/deviantart-follow.component';
import { DeviantComponent } from './deviant/deviant.component';
import { BlogModule } from '../blog/blog.module';
import { DeviantPipe } from '../../pipes/deviant.pipe';


@NgModule({
  declarations: [
    DeviantComponent,
    DeviantArtComponent,
    DeviantArtFollowComponent,
    DeviantPipe
  ],
  imports: [
    CommonModule,
    BlogModule
  ],
  providers: [ DeviantPipe ]
})
export class DeviantArtModule {}