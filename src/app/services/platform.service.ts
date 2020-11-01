import { Injectable } from '@angular/core';
import { Platform } from '../types/platform.types';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  userAgent = navigator.userAgent.toLowerCase();

  constructor() { }

  isPlatform(platform: Platform) {
    return this.userAgent.indexOf(platform) > -1;
  }

  isMobile() {
    return this.isiOS() || this.isAndroid();
  }

  isiOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  isAndroid() {
    /android/i.test(navigator.userAgent);
  }
}
