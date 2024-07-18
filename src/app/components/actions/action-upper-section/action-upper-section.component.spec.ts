import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionUpperSectionComponent } from './action-upper-section.component';

describe('ActionUpperSectionComponent', () => {
  let component: ActionUpperSectionComponent;
  let fixture: ComponentFixture<ActionUpperSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionUpperSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionUpperSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
