import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsSlickCarouselComponent } from './cards-slick-carousel.component';

describe('CardsSlickCarouselComponent', () => {
  let component: CardsSlickCarouselComponent;
  let fixture: ComponentFixture<CardsSlickCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsSlickCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsSlickCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
