import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() { }

  public getImagePath(imageName: string): string {
    return `./images/${imageName}.png`;
  }

  public stripLinks(caption: string): string {
    let captionFragments = caption.split("<a href=");
    let newCaptionFragments: string[] = [];
    captionFragments.forEach((str) => {
      const slicedStr = str.slice(str.indexOf("</a>")+4);
      newCaptionFragments.push(slicedStr);
    });
    console.log("NEW CAP FRAGMENTS: ", newCaptionFragments);
    return newCaptionFragments.join('');
  }


}
