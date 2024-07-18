import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageSnippetCarouselComponent } from './village-snippet-carousel.component';

describe('VillageSnippetCarouselComponent', () => {
  let component: VillageSnippetCarouselComponent;
  let fixture: ComponentFixture<VillageSnippetCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VillageSnippetCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VillageSnippetCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
