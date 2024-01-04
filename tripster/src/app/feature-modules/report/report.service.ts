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

  reportHost(report: Report): Observable<Report> {
    return this.http.post<Report>(`${environment.apiHost}users/reports/host`, report);
  }

  reportGuest(report: Report): Observable<Report> {
    return this.http.post<Report>(`${environment.apiHost}users/reports/guest`, report);
  }

  getAll(): Observable<Report[]> {
    return this.http.get<Report[]>(`${environment.apiHost}users/reports`);
  }

}
