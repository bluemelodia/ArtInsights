import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviantComponent } from './deviant.component';

describe('DeviantComponent', () => {
  let component: DeviantComponent;
  let fixture: ComponentFixture<DeviantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
