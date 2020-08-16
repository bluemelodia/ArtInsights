import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';

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

  public iconPath: string;

  constructor(private utils: UtilsService, private router: Router) { }

  ngOnInit(): void {
  }

  routeToLink() {
    console.log("Route the user to: ", this.link);
    this.router.navigateByUrl(this.link);
  }
}
