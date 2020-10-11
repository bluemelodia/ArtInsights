import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { LoadingService } from './loading.service';

/* 
* Used to redirect to an external resource. 
* Adapted from: https://medium.com/wizdm-genesys/angular-redirecting-to-external-links-bd3e785325c6
*/
@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(
    readonly router: Router, 
    private loading: LoadingService,
    @Inject(DOCUMENT) readonly document: Document
  ) {}
    /* 
    * The Window object from Document defaultView.
    */
    get window(): Window { 
      return this.document.defaultView; 
    }

    /*
    * Redirects to the specified external link.
    *
    * The _blank argument ensure that when we redirect to an external 
    * resource, another window will open and keep the app up and running.
    */
   public redirect(url: string, target = '_blank'): Observable<boolean> {
      /*
       * This is needed in Safari - as it will not open a new window by default, 
       * and without the rel="opener" attribute, window.opener will be null, 
       * preventing the opened window from sending a message back to the application. 
       */
      if (navigator.userAgent.includes("Safari")) {
        try {
          // Create a link in memory.
          let link = this.document.createElement("a");
          link.target = target;
          link.href = url;
          link.rel = "opener";
          
          // Dispatch a fake click
          let clickEvent = this.document.createEvent("MouseEvents");
          clickEvent.initMouseEvent("click", true, true, this.window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          link.dispatchEvent(clickEvent);
        } catch (error) {
          return error;
        }
      } else {
        window.open(url, "_blank");
      }
   }

   public route(path: string) {
      if (this.router.url !== path) {
        this.loading.showLoader();
        this.router.navigateByUrl(path);
      }
   }
}
