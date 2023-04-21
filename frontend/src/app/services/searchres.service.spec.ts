import { TestBed } from '@angular/core/testing';

import { SearchresService } from './searchres.service';

describe('SearchresService', () => {
  let service: SearchresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
