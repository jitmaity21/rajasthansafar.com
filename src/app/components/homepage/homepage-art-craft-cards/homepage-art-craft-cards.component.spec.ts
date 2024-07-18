import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageArtCraftCardsComponent } from './homepage-art-craft-cards.component';

describe('HomepageArtCraftCardsComponent', () => {
  let component: HomepageArtCraftCardsComponent;
  let fixture: ComponentFixture<HomepageArtCraftCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageArtCraftCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageArtCraftCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
