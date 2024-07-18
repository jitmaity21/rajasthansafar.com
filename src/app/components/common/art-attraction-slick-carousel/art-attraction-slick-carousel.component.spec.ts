import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtAttractionSlickCarouselComponent } from './art-attraction-slick-carousel.component';

describe('ArtAttractionSlickCarouselComponent', () => {
  let component: ArtAttractionSlickCarouselComponent;
  let fixture: ComponentFixture<ArtAttractionSlickCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtAttractionSlickCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtAttractionSlickCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
