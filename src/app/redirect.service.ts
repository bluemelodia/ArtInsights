import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';

/* 
* Used to redirect to an external resource. 
* Adapted from: https://medium.com/wizdm-genesys/angular-redirecting-to-external-links-bd3e785325c6
*/
@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(readonly router: Router, @Inject(DOCUMENT) readonly document: Document) {}
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
      try {
        this.window.open(url, target);
      } catch (error) {
        return error;
      }
   }
}
