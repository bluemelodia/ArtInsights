import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject$ = new Subject<boolean>();

  constructor() { }

  public get loadingSubscriber$() {
    return this.loadingSubject$;
  }

  public showLoader() {
    this.loadingSubject$.next(true);
    console.log("SHOW LOADER");
  }

  public hideLoader() {
    this.loadingSubject$.next(false);
    console.log("HIDE LOADER");
  }
}
