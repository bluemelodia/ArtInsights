import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortTime'
})
export class ShortTimePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value >= 0 && value <= 23) {
      if (value === 0) {
        return '12pm';
      }

      let suffix = value < 12? 'am' : 'pm';
      if (value > 12) {
        /* the pm numbers */
        return `${value-12}${suffix}`; 
      } else {
        return `${value}${suffix}`;
      }
    }
    return '';
  }

}
