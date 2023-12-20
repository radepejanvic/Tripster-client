import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from 'src/app/shared/util.service';
import { Day, Reservation } from './model/reservation.model';
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

  getCalendar(id: number): Observable<Day[]> {
    return this.http.get<Day[]>(`${environment.apiHost}accommodations/calendar/${id}`);
  }

}
