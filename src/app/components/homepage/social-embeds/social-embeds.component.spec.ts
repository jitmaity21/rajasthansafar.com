import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialEmbedsComponent } from './social-embeds.component';

describe('SocialEmbedsComponent', () => {
  let component: SocialEmbedsComponent;
  let fixture: ComponentFixture<SocialEmbedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialEmbedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialEmbedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
