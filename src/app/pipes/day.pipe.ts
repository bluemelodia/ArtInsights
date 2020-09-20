import { Pipe, PipeTransform } from '@angular/core';
import { DayOfWeekString } from '../types/time.types';
@Pipe({
  name: 'day'
})
export class DayPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value >= 0 && value <= 6) {
      return DayOfWeekString[value];
    }
    return '';
  }

}
