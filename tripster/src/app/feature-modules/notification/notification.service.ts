import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification } from './model/notification.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';
import { Status } from '../cards/accommodation-request-card/model/status.model';
import { Settings } from './model/settings.model';

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

  getFilterFromSettings(settings: Settings | null): string[] {
    if (settings == null) {
      return [];
    }

    let filters: string[] = [];
    if (settings.reservationNotification) filters.push('RESERVATION');
    if (settings.reviewNotification) filters.push('REVIEW');
    if (settings.accommodationReviewNotification) filters.push('ACCOMMODATION_REVIEW');
    return filters;
  }

  filterNotifications(notifications: Notification[], settings: Settings | null): Notification[] {
    if (settings == null) {
      return notifications;
    }
    return notifications.filter(notification => this.getFilterFromSettings(settings).includes(notification.type));
  }


}
