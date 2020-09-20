import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from '../../pipes/pipe.module';
import { HeatmapComponent } from './heatmap.component';


@NgModule({
  declarations: [
    HeatmapComponent
  ],
  imports: [
    CommonModule,
    PipeModule
  ]
})
export class HeatmapModule {}