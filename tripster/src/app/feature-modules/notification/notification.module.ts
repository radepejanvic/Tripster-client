import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications/notifications.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    NotificationsComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NotificationsComponent
  ]
})
export class NotificationModule { }
