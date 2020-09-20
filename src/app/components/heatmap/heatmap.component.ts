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
  @Input() mapTitle: string;

  /* Users must pass a structure like this: 
   *  { 0: { 21: [], 23: [] } , 1: { 2: [], 5: [] } }
   * The number of outer arrys 
   */
  @Input() mapData: MapData[];

  /* Map of days and times, used to create the heat map legend. */
  @Input() mapAxes: MapAxes = {
    mainAxis: [ 
      -1, /* Filler. */
      DayOfWeek.Sunday,
      DayOfWeek.Monday, 
      DayOfWeek.Tuesday, 
      DayOfWeek.Wednesday, 
      DayOfWeek.Thursday, 
      DayOfWeek.Friday,
      DayOfWeek.Saturday
    ],
    secondAxis: this.utils.fillArray(0, 23)
  };


  constructor(private utils: UtilsService) { }

  ngOnInit() {
  }

  getDataStyle(stat: number) {
    if (stat < 0) {
      return 'none';
    } else if (stat < 50) {
      return 'very-low';
    } else if (stat < 100) {
      return 'low';
    } else if (stat < 150) {
      return 'low-mid';
    } else if (stat < 200) {
      return 'mid';
    } else if (stat < 250) {
      return 'mid-high';
    } else {
      return 'high';
    }
  }
}
