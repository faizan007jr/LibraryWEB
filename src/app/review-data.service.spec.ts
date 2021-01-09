import { TestBed } from '@angular/core/testing';

import { ReviewDataService } from './review-data.service';

describe('ReviewDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviewDataService = TestBed.get(ReviewDataService);
    expect(service).toBeTruthy();
  });
});
