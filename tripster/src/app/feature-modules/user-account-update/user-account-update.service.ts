import { HttpClient, HttpResponse } from '@angular/common/http';
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
 
  updateUser(user: PersonUpdate): Observable<PersonUpdate> {
    return this.http.put<PersonUpdate>(environment.apiHost+'person/update', user);
  }

  getUser(id: number): Observable<PersonUpdate> {
    return this.http.get<PersonUpdate>(environment.apiHost+'person/'+id);
  }

  deleteUser(id: number): Observable<string> {
    return this.http.delete<string>(environment.apiHost+'person/'+id);
  }

}
