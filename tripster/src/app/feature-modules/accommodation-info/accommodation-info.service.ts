import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accommodation } from './model/accommodation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccommodationInfoService {

  constructor(private http: HttpClient) { }

  getAccommodation(id: number): Observable<Accommodation> {
    return this.http.get<Accommodation>('http://localhost:8080/api/accommodations/' + id);
  }

}
