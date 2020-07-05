import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {

  @Input() iconName: string;
  @Input() altText: string;

  constructor() { }

  ngOnInit(): void {
  }

  public getIconPath(): string {
    return `./images/${this.iconName}`;
  }
}
