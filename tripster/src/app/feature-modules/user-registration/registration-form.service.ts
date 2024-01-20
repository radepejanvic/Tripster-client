import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonCRUD } from './model/user.model';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root',
})
export class RegistrationFormService {
  constructor(private http: HttpClient) {}

  register(registration: PersonCRUD): Observable<PersonCRUD> {
    return this.http.post<PersonCRUD>(
      environment.apiHost + 'registration',
      registration
    );
  }
}
