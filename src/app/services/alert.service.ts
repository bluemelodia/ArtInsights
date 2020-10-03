import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertType, Alert } from '../app.consts';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject$ = new Subject<Alert>();

  constructor() { }

  /* 
  * Return an observable so that only the service can emit on the subject. 
  */
  public get alertSubscriber() {
    return this.alertSubject$.asObservable();
  }

  public showAlert(type: AlertType, message: string) {
      const alert: Alert = {
        type: type, 
        message: message
      };
      this.alertSubject$.next(alert);
  }
}
