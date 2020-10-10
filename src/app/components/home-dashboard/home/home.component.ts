import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { LoadingService } from '../../../services/loading.service';
import { Subscription, ReplaySubject } from 'rxjs';
import { RedirectService } from '../../../services/redirect.service';
import { homeActions } from '../../../app.consts';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private routeObserver: Subscription;
  public homeActions = homeActions;
  public homeLinks = {};

  constructor(
    private loading: LoadingService,
    private redirect: RedirectService, 
    private router: Router,
    private utils: UtilsService
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

    for(let action of homeActions) {
      this.homeLinks[action.iconName] = utils.getImagePath(action.iconName);
    }
  }

  ngOnInit() {

  }

  routeToLink(link: string) {
    this.redirect.route(link);
  }
}
