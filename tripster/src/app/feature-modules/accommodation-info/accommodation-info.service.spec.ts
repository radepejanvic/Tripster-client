import { TestBed } from '@angular/core/testing';

import { AccommodationInfoService } from './accommodation-info.service';

describe('AccommodationInfoService', () => {
  let service: AccommodationInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccommodationInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
