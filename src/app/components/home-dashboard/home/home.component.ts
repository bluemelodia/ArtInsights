import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { LoadingService } from '../../../services/loading.service';
import { Subscription, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private routeObserver: Subscription;

  constructor(
    private loading: LoadingService,
    private router: Router
  ) {
    this.routeObserver = this.router.events
      .pipe(takeUntil(this.destroyed$))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {     
          if (event.url === "/home") {
            this.loading.hideLoader();
          } 
        }
      });
  }

  ngOnInit() {
  }

}
