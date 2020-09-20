import { Pipe, PipeTransform } from '@angular/core';
import { DayOfWeekShortString } from '../types/time.types';

@Pipe({
  name: 'shortDay'
})
export class ShortDayPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    console.log("DAY OF WEEK: ", value);
    if (value >= 0 && value <= 6) {
      return DayOfWeekShortString[value];
    }
    return ''; 
  }

}
