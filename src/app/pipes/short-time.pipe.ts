import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortTime'
})
export class ShortTimePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value >= 0 && value <= 23) {
      let suffix = value < 12? 'am' : 'pm';
      let prefix = '';
      if (value === 0) {
        prefix = '12';
      } else if (value > 12) {
        /* the pm numbers */
        prefix = `${value-12}`; 
      }

      return `${prefix}${suffix}`;
    }
    return '';
  }

}
