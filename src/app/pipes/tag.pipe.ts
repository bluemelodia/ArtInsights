import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tag'
})
export class TagPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value.length > 20) {
      return `${value.trim().substring(0, 20)}...`
    }

    return value;
  }
}
