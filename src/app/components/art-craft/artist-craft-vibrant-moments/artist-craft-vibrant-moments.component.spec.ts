import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCraftVibrantMomentsComponent } from './artist-craft-vibrant-moments.component';

describe('ArtistCraftVibrantMomentsComponent', () => {
  let component: ArtistCraftVibrantMomentsComponent;
  let fixture: ComponentFixture<ArtistCraftVibrantMomentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistCraftVibrantMomentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistCraftVibrantMomentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
