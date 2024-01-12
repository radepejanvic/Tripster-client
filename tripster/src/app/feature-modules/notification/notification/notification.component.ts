import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notification } from '../model/notification.model';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  @Input() notification: Notification;
  @Output() read = new EventEmitter<string>();

  constructor(private notificationService: NotificationService) { }

  parseText(): string[] {
    return this.notification.text.split('\n');
  }

  markAsRead(): void {
    this.notificationService.markAsRead(this.notification.id).subscribe({
      next: (response: string) => {
        console.log('Successfully marked as read!');
        this.read.emit("" + this.notification.id);
      },
      error: (err: any) => {
        console.error('Error marking notificaion as read.', err);
        this.read.emit("" + this.notification.id);
      }
    });
  }

}
