import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {

  @Input() set iconName(iconName: string) {
    this.iconPath = this.utils.getIconPath(iconName);
  }
  @Input() altText: string;
  @Input() link: string;

  public iconPath: string;

  constructor(private utils: UtilsService) { }

  ngOnInit(): void {
  }
}
