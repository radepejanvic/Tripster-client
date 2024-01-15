import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccommodationInfoCard } from '../cards/accommodation-info-card/model/accommodation-info-card.model';
import { environment } from 'src/env/env';
import { AccommodationRequest } from '../cards/accommodation-request-card/model/accommodation-request.mode';
import { Reservation } from '../cards/guest-reservation-card/model/reservation.model';
import { AuthorizationService } from '../authorization/authorization.service';
import { Review } from '../accommodation-info/model/accommodation.model';
import { ReviewReport } from '../cards/accommodation-review-report-card/model/review-report.model';
import { Report } from '../report/model/report.model';

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
  getAllAccommodations(): Observable<AccommodationInfoCard[]> {
    return this.http.get<AccommodationInfoCard[]>(
      environment.apiHost + 'accommodations/guest'
    );
  }

  getGuestReservation(id: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      environment.apiHost + 'reservations/guest/' + id
    );
  }
  getGuestReservationByParams(
    params: HttpParams,
    id: number
  ): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      environment.apiHost + 'reservations/guest/filter/' + id,
      { params }
    );
  }

  getHostReservation(id: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      environment.apiHost + 'reservations/host/' + id
    );
  }
  getHostReservationByParams(
    params: HttpParams,
    id: number
  ): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      environment.apiHost + 'reservations/host/filter/' + id,
      { params }
    );
  }

  getGuestFavotiteAccommodation(
    id: number
  ): Observable<AccommodationInfoCard[]> {
    return this.http.get<AccommodationInfoCard[]>(
      environment.apiHost + 'accommodations/favorites/' + id
    );
  }

  getAccommodationReview(): Observable<Review[]> {
    return this.http.get<Review[]>(
      environment.apiHost + 'accommodations/reviews/new'
    );
  }
  getAccommodationReportReview(): Observable<ReviewReport[]> {
    return this.http.get<ReviewReport[]>(
      environment.apiHost + 'accommodations/reviews/reports'
    );
  }
  getUserReport(): Observable<Report[]> {
    return this.http.get<Report[]>(environment.apiHost + 'users/reports');
  }
  getUserReportReview(): Observable<ReviewReport[]> {
    return this.http.get<ReviewReport[]>(
      environment.apiHost + 'users/reviews/reports'
    );
  }
}
