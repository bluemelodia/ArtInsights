import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor() {}

  findMedian(array: any[]) {
    if (array && array.length > 0) {
      const len = array.length;
      const mid = Math.floor(array.length / 2);
      if (array.length % 2 === 0) {
        return array[mid];
      } else {
        return (array[mid - 1] + array[mid])/2;
      }
    }
  }

  findAverage(array: number[]) {
    let sum = 0;
    array.forEach(num => {
      sum += num;
    });
    return sum/array.length;
  }
}
