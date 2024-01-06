import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Analytics } from './model/analytics.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }

  getAnnual(id: number, year: number): Observable<Analytics[]> {
    return this.http.get<Analytics[]>(`${environment.apiHost}analytics/${id}/${year}`);
  }

  getTotal(id: number, start: number, end: number): Observable<Analytics[]> {
    return this.http.get<Analytics[]>(`${environment.apiHost}analytics/${id}/${start}/${end}`);
  }

}
