import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ArtInsights';

  public async sendRequest() {
    console.log("SEND");
    await fetch('https://www.deviantart.com/oauth2/authorize?response_type=code&client_id=12698&scope=browse%20user&redirect_uri=https://bluemelodia.github.io/ArtInsights&state=de3a2397-1464-4b11-a028-ec25cc2de2e5')
    .then(data => {
      console.log("DATA: ", data);
    })
    .catch(error => {
      console.log("ERROR: ", error);
    });
  }
}
