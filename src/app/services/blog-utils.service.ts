import { Injectable } from '@angular/core';
import { TaggedTweet } from '../types/tag.types';

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

  public visitTweet(tweet: TaggedTweet) {
    let user = tweet.user.id_str;
    let id = tweet.id_str;
    window.open(`https://twitter.com/${user}/status/${id}`, "_blank");
  }

  public dateForTimestamp(timestamp: number) {
      return new Date(timestamp * 1000);
  }

  /* Captions have html. Disable the links. */
  public stripLinks(html: string, hoverColor: string): string {
    var htmlStr = html;
    var div = document.createElement('div');
    div.innerHTML = htmlStr;

    let links = div.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      html = html.replace(link.toString(), '');
    }

    console.log("Current content: ", html);

    html = html.replace('<a href>', '');
    html = html.replace('</a>', '');
    console.log("Replaced content: ", html);

    return html;
  }
}
