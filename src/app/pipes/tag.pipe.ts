import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tag'
})
export class TagPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value.length > 18) {
      return `${value.trim().substring(0, 18)}...`
    }

    return value;
  }
}
