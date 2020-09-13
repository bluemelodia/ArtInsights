import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() { }

  public getImagePath(imageName: string): string {
    return `./images/${imageName}.png`;
  }

  public stripLinks(caption: string): string {
    let captionFragments = caption.split("<a");
    let newCaptionFragments: string[] = [];
    captionFragments.forEach((str: string) => {
      let slicedStr = str.slice(str.indexOf(">"));
      console.log("Sliced off the <a> - start: ", slicedStr);
      slicedStr = slicedStr.replace("</a>", "");
      newCaptionFragments.push(slicedStr);
    });
    return newCaptionFragments.join('');
  }
}