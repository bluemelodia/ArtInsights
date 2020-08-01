import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() placeholder = 'Search';
  @Output() onUserSearch = new EventEmitter();

  public searchIconPath = './images/search.png';
  
  constructor() { }

  ngOnInit() {
  }

  userSearched(searchString: string) {
    console.log("User searched for: ", searchString);
    this.onUserSearch.emit(searchString);
  }

}
