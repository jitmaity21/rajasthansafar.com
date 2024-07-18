import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourIntroGalleryComponent } from './four-intro-gallery.component';

describe('FourIntroGalleryComponent', () => {
  let component: FourIntroGalleryComponent;
  let fixture: ComponentFixture<FourIntroGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourIntroGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourIntroGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
