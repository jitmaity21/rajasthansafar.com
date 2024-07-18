import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtCraftArtistProfileComponent } from './art-craft-artist-profile.component';

describe('ArtCraftArtistProfileComponent', () => {
  let component: ArtCraftArtistProfileComponent;
  let fixture: ComponentFixture<ArtCraftArtistProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtCraftArtistProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtCraftArtistProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
