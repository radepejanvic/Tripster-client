import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from 'src/app/shared/util.service';
import { Day, DayAdapter, Reservation } from './model/reservation.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient, private util: UtilService) { }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${environment.apiHost}reservations`, reservation);
  }

  getCalendar(id: number): Observable<DayAdapter[]> {
    return this.http.get<DayAdapter[]>(`${environment.apiHost}accommodations/calendar/${id}`);
  }

}
