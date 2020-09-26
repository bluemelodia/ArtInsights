import { Component, OnInit, Input } from '@angular/core';
import { MapData, MapAxes } from '../../types/map.types';
import { DayOfWeek } from '../../types/time.types';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {
  @Input() mapTitle: string = 'Map';
  @Input() xLabel: string = 'Times';
  @Input() yLabel: string = 'Days';

  /* Users can pass in their own array to indicate 
  * what qualifies for each engagement tier. */
  @Input() engagementLevels: number[] = [0, 25, 50, 100, 250, 500];

  /* Users must pass a structure like this: 
   *  { 0: { 21: [], 23: [] } , 1: { 2: [], 5: [] } }
   * The number of outer arrys 
   */
  @Input() mapData: MapData[];

  /* Map of days and times, used to create the heat map legend. */
  @Input() mapAxes: MapAxes = {
    mainAxis: [ 
      DayOfWeek.Sunday,
      DayOfWeek.Monday, 
      DayOfWeek.Tuesday, 
      DayOfWeek.Wednesday, 
      DayOfWeek.Thursday, 
      DayOfWeek.Friday,
      DayOfWeek.Saturday
    ],
    secondAxis: this.utils.fillArray(0, 24)
  };


  constructor(private utils: UtilsService) { }

  ngOnInit() {
  }

  getMapData(x: number, y: number, forDisplay: boolean) {
    if (this.mapData[x][y]) {
      return this.mapData[x][y];
    }

    return forDisplay ? '-' : -1;
  }

  getDataStyle(stat: number) {
    if (stat < this.engagementLevels[0]) {
      return 'none';
    } else if (stat < this.engagementLevels[1]) {
      return 'very-low';
    } else if (stat < this.engagementLevels[2]) {
      return 'low';
    } else if (stat < this.engagementLevels[3]) {
      return 'low-mid';
    } else if (stat < this.engagementLevels[4]) {
      return 'mid';
    } else if (stat < this.engagementLevels[5]) {
      return 'mid-high';
    } else {
      return 'high';
    }
  }
}
