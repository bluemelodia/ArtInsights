import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertType, Alert } from '../app.consts';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject$ = new Subject<Alert>();

  constructor() { }

  public get alertSubscriber$() {
    return this.alertSubject$;
  }

  public showAlert(type: AlertType, message: string) {
      const alert: Alert = {
        type: type, 
        message: message
      };
      this.alertSubscriber$.next(alert);
  }
}
