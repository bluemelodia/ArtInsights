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
    let captionFragments = caption.split("<a");
    let newCaptionFragments: string[] = [];
    captionFragments.forEach((str: string) => {
      /* The first one might not have a link, push directly. */
      if (str.includes("</a>")) {
        let slicedStr = str.slice(str.indexOf(">") + 1);

        /* This logic is specific to DeviantArt, removing this attribute allows thumb images to be shown. */
        if (slicedStr.includes("srcset")) {
            console.log("Sliced str before srcset : ", slicedStr);
            slicedStr.replace(slicedStr.slice(slicedStr.indexOf("srcset=\""), slicedStr.indexOf("sizes")), '');
            console.log("Sliced str after srcset : ", slicedStr);
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