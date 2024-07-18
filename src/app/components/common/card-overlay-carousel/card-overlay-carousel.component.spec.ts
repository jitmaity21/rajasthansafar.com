import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOverlayCarouselComponent } from './card-overlay-carousel.component';

describe('CardOverlayCarouselComponent', () => {
  let component: CardOverlayCarouselComponent;
  let fixture: ComponentFixture<CardOverlayCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOverlayCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOverlayCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
