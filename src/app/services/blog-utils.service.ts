import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogUtilsService {

  constructor() { }

  /* Open in a tab. */
  public visitBlog(blogURL: string) {
      window.open(blogURL, "_blank");
  }

  public visitDeviantArt(username: string) {
    window.open(`https://${username}.deviantArt.com`, "_blank");
  }

  public visitTwitter(username: string) {
    window.open(`https://twitter.com/${username}`, "_blank");
  }

  public dateForTimestamp(timestamp: number) {
      return new Date(timestamp * 1000);
  }
}
