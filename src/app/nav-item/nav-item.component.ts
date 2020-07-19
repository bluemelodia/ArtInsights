import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {

  @Input() iconName: string;
  @Input() altText: string;
  @Input() link: string;

  constructor(private utils: UtilsService) { }

  ngOnInit(): void {
  }

  public getIconPath(): string {
    return this.utils.getIconPath(this.iconName);
  }
}
