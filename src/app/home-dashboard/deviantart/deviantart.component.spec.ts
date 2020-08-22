import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviantArtComponent } from '../../components/deviantart/deviantart.component';

describe('DeviantArtComponent', () => {
  let component: DeviantArtComponent;
  let fixture: ComponentFixture<DeviantArtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviantArtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviantArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
