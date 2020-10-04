import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { RedirectService } from '../../../services/redirect.service';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {

  @Input() set iconName(iconName: string) {
    this.iconPath = this.utils.getImagePath(iconName);
  }
  @Input() altText: string;
  @Input() link: string;
  @Input() name: string;
  @Input() disableNav: boolean;

  public iconPath: string;

  constructor(
    private utils: UtilsService, 
    private redirect: RedirectService, 
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  routeToLink() {
    if (!this.disableNav) {
      this.redirect.route(this.link);
    }
  }
}
