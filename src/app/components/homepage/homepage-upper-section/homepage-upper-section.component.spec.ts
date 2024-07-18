import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageUpperSectionComponent } from './homepage-upper-section.component';

describe('HomepageUpperSectionComponent', () => {
  let component: HomepageUpperSectionComponent;
  let fixture: ComponentFixture<HomepageUpperSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageUpperSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageUpperSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
