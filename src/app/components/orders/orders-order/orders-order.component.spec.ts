import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquireOrderComponent } from './orders-order.component';

describe('EnquireOrderComponent', () => {
  let component: EnquireOrderComponent;
  let fixture: ComponentFixture<EnquireOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquireOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquireOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
