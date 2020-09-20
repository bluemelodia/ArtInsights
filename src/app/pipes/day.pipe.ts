import { Pipe, PipeTransform } from '@angular/core';
import { DayOfWeek } from '../types/time.types';

@Pipe({
  name: 'day'
})
export class DayPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value as DayOfWeek;
  }

}
