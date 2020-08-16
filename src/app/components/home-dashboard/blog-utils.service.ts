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

  public dateForTimestamp(timestamp: number) {
      return new Date(timestamp * 1000);
  }
}