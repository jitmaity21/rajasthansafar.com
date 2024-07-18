import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistProductListComponent } from './artist-product-list.component';

describe('ArtistProductListComponent', () => {
  let component: ArtistProductListComponent;
  let fixture: ComponentFixture<ArtistProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
