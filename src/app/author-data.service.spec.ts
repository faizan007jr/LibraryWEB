import { TestBed } from '@angular/core/testing';

import { AuthorDataService } from './author-data.service';

describe('AuthorDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorDataService = TestBed.get(AuthorDataService);
    expect(service).toBeTruthy();
  });
});
