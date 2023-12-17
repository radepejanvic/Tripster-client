import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonCRUD } from '../user-registration/model/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class UserAccountUpdateService {

  constructor(private http: HttpClient) { }

  // getUser(token: string): 
  updateUser(user: PersonCRUD): Observable<PersonCRUD> {
    return this.http.post<PersonCRUD>(environment.apiHost+'person/update', user);
  }

  // getUser(): Observable<PersonCRUD> {
  //   return this.http.post<P
  // }

}
