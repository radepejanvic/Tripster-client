import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonCRUD } from '../user-registration/model/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';
import { PersonUpdate } from './model/user-update.model';

@Injectable({
  providedIn: 'root'
})
export class UserAccountUpdateService {

  constructor(private http: HttpClient) { }

  // getUser(token: string): 
  updateUser(user: PersonUpdate): Observable<PersonUpdate> {
    return this.http.put<PersonUpdate>(environment.apiHost+'person/update', user);
  }

  // getUser(): Observable<PersonCRUD> {
  //   return this.http.post<P
  // }

}
