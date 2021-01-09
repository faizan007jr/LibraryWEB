import { TestBed } from '@angular/core/testing';

import { PublisherDataService } from './publisher-data.service';

describe('PublisherDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublisherDataService = TestBed.get(PublisherDataService);
    expect(service).toBeTruthy();
  });
});
