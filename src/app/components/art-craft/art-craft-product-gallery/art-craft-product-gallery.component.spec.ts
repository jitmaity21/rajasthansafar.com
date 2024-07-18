import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtCraftProductGalleryComponent } from './art-craft-product-gallery.component';

describe('ArtCraftProductGalleryComponent', () => {
  let component: ArtCraftProductGalleryComponent;
  let fixture: ComponentFixture<ArtCraftProductGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtCraftProductGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtCraftProductGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
