import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtCraftFeaturesComponent } from './art-craft-features.component';

describe('ArtCraftFeaturesComponent', () => {
  let component: ArtCraftFeaturesComponent;
  let fixture: ComponentFixture<ArtCraftFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtCraftFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtCraftFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
