import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ArtInsights';

  @HostListener('window:message', ['$event'])
  receivedPostedMessage(event: any) {
    console.log("Received a message: ", event);
    if (event.origin !== 'https://artinsights.ue.r.appspot.com') {
      return;
    }
    console.log("Auth passed? ");
  }
}
