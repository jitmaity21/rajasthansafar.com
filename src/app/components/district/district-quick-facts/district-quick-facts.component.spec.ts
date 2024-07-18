import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictQuickFactsComponent } from './district-quick-facts.component';

describe('DistrictQuickFactsComponent', () => {
  let component: DistrictQuickFactsComponent;
  let fixture: ComponentFixture<DistrictQuickFactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictQuickFactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictQuickFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
