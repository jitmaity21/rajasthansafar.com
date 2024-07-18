import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictArtCraftGalleryComponent } from './district-art-craft-gallery.component';

describe('DistrictArtCraftGalleryComponent', () => {
  let component: DistrictArtCraftGalleryComponent;
  let fixture: ComponentFixture<DistrictArtCraftGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictArtCraftGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictArtCraftGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
