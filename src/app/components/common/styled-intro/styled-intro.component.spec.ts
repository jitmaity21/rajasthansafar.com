import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyledIntroComponent } from './styled-intro.component';

describe('StyledIntroComponent', () => {
  let component: StyledIntroComponent;
  let fixture: ComponentFixture<StyledIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyledIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyledIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
