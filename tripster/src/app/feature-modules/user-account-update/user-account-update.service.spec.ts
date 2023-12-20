import { TestBed } from '@angular/core/testing';

import { UserAccountUpdateService } from './user-account-update.service';

describe('UserAccountUpdateService', () => {
  let service: UserAccountUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAccountUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
