import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageDistrictsMapComponent } from './homepage-districts-map.component';

describe('HomepageDistrictsMapComponent', () => {
  let component: HomepageDistrictsMapComponent;
  let fixture: ComponentFixture<HomepageDistrictsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageDistrictsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageDistrictsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
