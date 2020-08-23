import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deviant'
})
export class DeviantPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let role = '';
    
    if (value === 'senior') {
      role = "Senior Member";
    } else if (value === 'volunteer') {
      role = "Community Volunteer";
    } else if (value === 'admin') {
      role = "Staff Member";
    }
    return role;
  }

}
