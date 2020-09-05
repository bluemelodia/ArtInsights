import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TumblrTagsComponent } from './tumblr-tags.component';

describe('TumblrTagsComponent', () => {
  let component: TumblrTagsComponent;
  let fixture: ComponentFixture<TumblrTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TumblrTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TumblrTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
