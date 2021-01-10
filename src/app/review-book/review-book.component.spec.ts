import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReviewBookComponent } from './review-book.component';

describe('ReviewBookComponent', () => {
  let component: ReviewBookComponent;
  let fixture: ComponentFixture<ReviewBookComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
