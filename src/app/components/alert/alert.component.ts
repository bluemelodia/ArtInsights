import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { timer, Observable } from 'rxjs';
import { Alert, AlertType } from '../../app.consts';
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
  private alertSub$: Observable<Alert>;

  public alertMessage = '...';
  public alertStyle = '';
  public showAlert = false;

  private set AlertType(type: AlertType) {
    this.alertStyle = type;
  }

  constructor(private alert: AlertService) { 
    this.setupAlertSubscription();
  }

  ngOnInit() {
  }

  private setupAlertSubscription() {
    this.alertSub$ = this.alert.alertSubscriber;
    this.alertSub$
      .subscribe((alert: Alert) => {
        /* Dismiss the previous alert. */
        this.dismissAlert();
        timer(0)
          .subscribe(() => {
            this.AlertType = alert.type;
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
    timer(5000)
      .subscribe(() => {
        this.dismissAlert();
      });
  }
}
