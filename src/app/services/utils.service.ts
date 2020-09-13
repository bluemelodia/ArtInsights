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
    let captionWithoutHrefs = this.stripLinksUsingSplitter(caption, this.stripHrefLinks);
    console.log("First split: ", captionWithoutHrefs);
    let captionWithoutLinks = this.stripLinksUsingSplitter(captionWithoutHrefs, this.stripExternalLinks);
    console.log("Second split: ", captionWithoutLinks);

    return captionWithoutLinks;
  }

  private stripHrefLinks(caption: string) {
    return caption.split("<a href=");
  }

  private stripExternalLinks(caption: string) {
    return caption.split("<a class=\"external\" href=");
  }

  private stripLinksUsingSplitter(caption: string, splitter: Function) {
    let captionFragments = splitter(caption);
    let newCaptionFragments: string[] = [];
    captionFragments.forEach((str: string) => {
      const slicedStr = str.slice(str.indexOf("</a>")+4);
      newCaptionFragments.push(slicedStr);
    });
    return newCaptionFragments.join('');
  }
}
