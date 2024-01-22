import { TestBed } from '@angular/core/testing';

import { UserAccountUpdateService } from './user-account-update.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/env/env';
import { person } from 'src/app/mocks/update-form.service.mock';

describe('UserAccountUpdateService', () => {
  let service: UserAccountUpdateService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserAccountUpdateService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call update account and the API should return the newly updated account', () => {
    service.updateUser(person).subscribe((data) => {
      expect(data).toEqual(person);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${environment.apiHost}person/update`,
    });

    req.flush(person);
  });
});
