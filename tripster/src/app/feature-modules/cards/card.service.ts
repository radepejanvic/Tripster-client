import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Status } from './accommodation-request-card/model/status.model';
import { environment } from 'src/env/env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private http: HttpClient) {}

  accepted(id: number) {
    const status: Status = {
      id: id,
      status: 'ACTIVE',
    };
    return this.http.patch<Status>(
      environment.apiHost + 'accommodations',
      status
    );
  }

  suspended(id: number) {
    const status: Status = {
      id: id,
      status: 'SUSPENDED',
    };
    return this.http.patch<Status>(
      environment.apiHost + 'accommodations',
      status
    );
  }

  approveAccommodationReview(id: number) {
    const status: Status = {
      id: id,
      status: 'ACTIVE',
    };
    return this.http.patch<Status>(
      environment.apiHost + 'accommodations/reviews',
      status
    );
  }

  deletedAccommodationReview(id: number) {
    return this.http.delete<Status>(
      environment.apiHost + 'accommodations/reviews/' + id
    );
  }

  approveAccommodationReportReview(id: number): Observable<number> {
    return this.http.patch<number>(
      environment.apiHost + 'accommodations/reviews/reports/' + id,
      null
    );
  }

  deletedAccommodationReportReview(id: number) {
    return this.http.delete<Status>(
      environment.apiHost + 'accommodations/reviews/reports/' + id
    );
  }

  approveUserReportReview(id: number): Observable<number> {
    return this.http.patch<number>(
      environment.apiHost + 'users/reviews/reports/' + id,
      null
    );
  }

  deletedUserReportReview(id: number) {
    return this.http.delete<Status>(
      environment.apiHost + 'users/reviews/reports/' + id
    );
  }

  approveUserReport(id: number): Observable<number> {
    return this.http.patch<number>(
      environment.apiHost + 'users/reports/' + id,
      null
    );
  }

  deletedUserReport(id: number) {
    return this.http.delete<Status>(
      environment.apiHost + 'users/reports/' + id
    );
  }
}
