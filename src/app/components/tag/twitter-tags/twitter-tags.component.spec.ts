import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterTagsComponent } from './twitter-tags.component';

describe('TwitterTagsComponent', () => {
  let component: TwitterTagsComponent;
  let fixture: ComponentFixture<TwitterTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
