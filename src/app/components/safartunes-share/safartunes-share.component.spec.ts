import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafartunesShareComponent } from './safartunes-share.component';

describe('SafartunesShareComponent', () => {
  let component: SafartunesShareComponent;
  let fixture: ComponentFixture<SafartunesShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafartunesShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafartunesShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
