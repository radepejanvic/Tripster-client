import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';
import { Report } from './model/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  reportUser(report: Report): Observable<Report> {
    return this.http.post<Report>(`${environment.apiHost}users/reports`, report);
  }

  reportAccommodationReview(report: Report): Observable<Report> {
    return this.http.post<Report>(`${environment.apiHost}accommodations/reviews/reports`, report);
  }

  getAll(): Observable<Report[]> {
    return this.http.get<Report[]>(`${environment.apiHost}users/reports`);
  }

}
