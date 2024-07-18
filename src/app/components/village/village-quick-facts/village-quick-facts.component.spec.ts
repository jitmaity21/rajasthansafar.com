import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageQuickFactsComponent } from './village-quick-facts.component';

describe('VillageQuickFactsComponent', () => {
  let component: VillageQuickFactsComponent;
  let fixture: ComponentFixture<VillageQuickFactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VillageQuickFactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VillageQuickFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
