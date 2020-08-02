import { Component, OnInit, HostBinding } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Subject, timer } from 'rxjs';
import { Alert, alertType } from '../../app.consts';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('showHide', [
      state('show', style({ 
        bottom: 0
      })),
      state('hide', style({
        bottom: '-64px'
      })),
      transition('show => hide', [
        animate('0.25s')
      ]),
      transition('hide => show', [
        animate('0.25s')
      ]),
    ]),
  ]
})
export class AlertComponent implements OnInit {
  private alertSub$: Subject<Alert>;

  public alertMessage = '...';
  public alertStyle = '';
  public showAlert = false;

  private set alertType(type: alertType) {
    this.alertStyle = type;
  }

  constructor(private alert: AlertService) { 
    this.setupAlertSubscription();
  }

  ngOnInit() {
  }

  private setupAlertSubscription() {
    this.alertSub$ = this.alert.alertSubscriber$;
    this.alertSub$
      .subscribe((alert: Alert) => {
        /* Dismiss the previous alert. */
        this.dismissAlert();
        timer(0)
          .subscribe(() => {
            this.alertType = alert.type;
            this.alertMessage = alert.message;
            this.showAlert = true;
            this.delayedDismiss();
          });
      });
  }

  private dismissAlert() {
    this.showAlert = false;
    this.alertMessage = "...";
  }

  private delayedDismiss() {
    timer(3000)
      .subscribe(() => {
        this.dismissAlert();
      });
  }
}
