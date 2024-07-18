import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorOverlayCarouselComponent } from './color-overlay-carousel.component';

describe('ColorOverlayCarouselComponent', () => {
  let component: ColorOverlayCarouselComponent;
  let fixture: ComponentFixture<ColorOverlayCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorOverlayCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorOverlayCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
