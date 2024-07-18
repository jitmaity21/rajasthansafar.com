import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsVideosComponent } from './actions-videos.component';

describe('ActionsVideosComponent', () => {
  let component: ActionsVideosComponent;
  let fixture: ComponentFixture<ActionsVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
