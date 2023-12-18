import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccommodationInfoCard } from '../cards/accommodation-info-card/model/accommodation-info-card.model';
import { environment } from 'src/env/env';
import { AccommodationRequest } from '../cards/accommodation-request-card/model/accommodation-request.mode';

@Injectable({
	providedIn: 'root',
})
export class FilterService {
	constructor(private http: HttpClient) {}

	getAccommodationByFiltersForGuest(
		params: HttpParams
	): Observable<AccommodationInfoCard[]> {
		return this.http.get<AccommodationInfoCard[]>(
			environment.apiHost + 'accommodations/guest/filters',
			{ params }
		);
	}

	getAccommodationRequestByFiltersForAdmin(
		params: HttpParams
	): Observable<AccommodationRequest[]> {
		return this.http.get<AccommodationRequest[]>(
			environment.apiHost + 'accommodations/admin',
			{ params }
		);
	}
	getAccommodationForHost(id: number): Observable<AccommodationInfoCard[]> {
		return this.http.get<AccommodationInfoCard[]>(
			environment.apiHost + 'accommodations/host/' + id
		);
	}
}
