import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBookComponent } from './review-book.component';

describe('ReviewBookComponent', () => {
  let component: ReviewBookComponent;
  let fixture: ComponentFixture<ReviewBookComponent>;

  beforeEach(async(() => {
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
