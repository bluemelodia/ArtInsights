import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public getIconPath(iconName: string): string {
    return `./images/${iconName}`;
  }
}
