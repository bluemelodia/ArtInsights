import { Injectable } from '@angular/core';
import { Platform } from '../types/platform.types';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  userAgent = navigator.userAgent.toLowerCase();

  constructor() { }

  isPlatform(platform: Platform) {
    let isPlatform = this.userAgent.indexOf(platform) > -1;
    switch (platform) {
      case Platform.Chrome:
        isPlatform = isPlatform && this.userAgent.indexOf('crios') > -1;
    }

    return this.userAgent.indexOf(platform) > -1;
  }

  isMobile() {
    return this.isiOS() || this.isAndroid();
  }

  /*
  * This works because Firefox's user agent contains 'safari' on tablets - can't rely on
  * the isMobile check as the user agent string also contains 'macintosh.' Firefox Desktop
  * will fail this check (as desired), as the user agent string contains 'firefox'.
  * 
  * If Firefox fixes its user agent string, the second condition will become true.
  */
  isSafariOrFirefoxMobile() {
    return !(
      !this.isPlatform(Platform.Chrome) 
      && (!this.isPlatform(Platform.Safari) || !this.isMobile())
    );
  }

  isiOS() {
    alert("iphone test: " + /ipad|iphone|ipod/.test(this.userAgent));
    return /ipad|iphone|ipod/.test(this.userAgent);
  }

  isAndroid() {
    alert("android test: " + /android/i.test(this.userAgent));
    return /android/i.test(this.userAgent);
  }
}
