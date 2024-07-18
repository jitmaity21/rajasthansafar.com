import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageHolderSmallComponent } from './image-holder-small.component';

describe('ImageHolderSmallComponent', () => {
  let component: ImageHolderSmallComponent;
  let fixture: ComponentFixture<ImageHolderSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageHolderSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageHolderSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
