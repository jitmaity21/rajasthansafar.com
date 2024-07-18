import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsProjectsComponent } from './actions-projects.component';

describe('ActionsProjectsComponent', () => {
  let component: ActionsProjectsComponent;
  let fixture: ComponentFixture<ActionsProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
