import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() { }

  public getImagePath(imageName: string): string {
    return `./images/${imageName}.png`;
  }

  public fillArray(start: number, end: number) {
    const arr = [];
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
    return arr;
  }

  public stripLinks(caption: string): string {
    let captionFragments = caption.split("<a");
    let newCaptionFragments: string[] = [];
    captionFragments.forEach((str: string) => {
      /* The first one might not have a link, push directly. */
      if (str.includes("</a>")) {
        let slicedStr = str.slice(str.indexOf(">") + 1);
        slicedStr = slicedStr.replace("</a>", "");

        /* This logic is specific to DeviantArt, removing this attribute allows thumb images to be shown. */
        if (slicedStr.includes("srcset")) {
            slicedStr = slicedStr.slice(0, slicedStr.indexOf("data-src")) + slicedStr.slice(slicedStr.indexOf("sizes"), slicedStr.length);
        }

        newCaptionFragments.push(slicedStr);
      } else {
        newCaptionFragments.push(str);
      }
    });
    return newCaptionFragments.join('');
  }
}