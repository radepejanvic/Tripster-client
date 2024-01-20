import { TestBed } from '@angular/core/testing';

import { RegistrationFormService } from './registration-form.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/env/env';
import { person } from 'src/app/mocks/registration-form.service.mock';

describe('RegistrationFormService', () => {
  let service: RegistrationFormService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RegistrationFormService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call register and the API should return the person that was registered', () => {
    service.register(person).subscribe((data) => {
      expect(data).toEqual(person);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: environment.apiHost + 'registration',
    });

    req.flush(person);
  });
});
