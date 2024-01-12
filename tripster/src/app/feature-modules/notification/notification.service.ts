import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification } from './model/notification.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';
import { Status } from '../cards/accommodation-request-card/model/status.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getUnreadNotifications(id: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${environment.apiHost}notifications/unread/${id}`);
  }

  markAsRead(id: number): Observable<string> {
    let status: Status = {
      id: id,
      status: 'READ'
    }
    return this.http.patch<string>(`${environment.apiHost}notifications`, status);
  }

}
