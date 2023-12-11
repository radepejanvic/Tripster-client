import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccommodationInfoCard } from '../cards/accommodation-info-card/model/accommodation-info-card.model';
import { environment } from 'src/env/env';
import { AccommodationRequest } from '../cards/accommodation-request-card/model/accommodation-request.mode';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http:HttpClient) { }

  getAccommodationByFiltersForGuest(some:any): Observable<AccommodationInfoCard[]>{
    return this.http.get<AccommodationInfoCard[]>(environment.apiHost+"accommodations/guest")
  }

  getAccommodationRequestByFiltersForAdmin(some:any): Observable<AccommodationRequest[]>{
    return this.http.get<AccommodationRequest[]>(environment.apiHost+"accommodations/admin")
  }

}
