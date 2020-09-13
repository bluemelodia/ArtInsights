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
      /* The first one might not have a link, push directly. */
      if (str.includes("</a>")) {
        let slicedStr = str.slice(str.indexOf(">") + 1);
        console.log("Sliced off the <a> - start: ", slicedStr);

        if (slicedStr.includes("srcset")) {
            let srcFragments = str.split("srcset=\"");
            srcFragments[1] = str.slice(str.indexOf("sizes"));
            slicedStr = srcFragments.join('');
            console.log("Sliced str after srcset: ", slicedStr);
        }

        slicedStr = slicedStr.replace("</a>", "");
        newCaptionFragments.push(slicedStr);
      } else {
        newCaptionFragments.push(str);
      }
    });
    return newCaptionFragments.join('');
  }
}