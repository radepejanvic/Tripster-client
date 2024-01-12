import { Component, OnInit } from '@angular/core';
import { Notification } from '../model/notification.model';
import { NotificationService } from '../notification.service';
import { AuthorizationService } from '../../authorization/authorization.service';

import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { environment } from 'src/env/env';
import { Message } from 'primeng/api';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
  animations: [
    trigger('changeHeaderBackground', [
      state('hidden', style({
        backgroundColor: 'transparent',
      })),
      state('visible', style({
        backgroundColor: '#f0f0f0',
      })),
      transition('hidden <=> visible', animate('300ms ease-in-out')),
    ]),
    trigger('rotateImage', [
      state('normal', style({ transform: 'rotate(0deg)' })),
      state('rotated', style({ transform: 'rotate(90deg)' })),
      transition('normal <=> rotated', animate('300ms ease-in-out')),
    ]),
    trigger('showHideSettings', [
      state('hidden', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden',
      })),
      state('visible', style({
        height: '*',
        opacity: 1,
        overflow: 'visible',
      })),
      transition('hidden <=> visible', animate('300ms ease-in-out')),
    ]),
  ],
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  settingsState: 'hidden' | 'visible' = 'hidden';
  headerBackgroundState: 'hidden' | 'visible' = 'hidden';
  imageRotationState: 'normal' | 'rotated' = 'normal';

  private serverUrl = environment.socket + 'socket'
  private stompClient: any;

  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  messages: Message[] = [];

  constructor(private notificationService: NotificationService,
    private authService: AuthorizationService) { }

  ngOnInit(): void {
    this.notificationService.getUnreadNotifications(this.authService.getUserId()).subscribe({
      next: (response: Notification[]) => {
        this.notifications = response;
        console.log(`Fetched ${response.length} unread notifications.`);
        console.log(response);
      },
      error: (err: any) => {
        console.error('Error fetching notifications. ', err);
      }
    })

    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {

    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({}, function () {
      that.isLoaded = true;
      that.openSocket();
    });

  }

  openSocket() {
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe("/socket-publisher/" + this.authService.getUserId(), (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }

  handleResult(message: { body: string; }) {
    if (message.body) {

      let notification: Notification = JSON.parse(message.body);

      console.log('TimeStamp: ', notification.timeStamp);
      this.notifications.push(notification);
    }
  }

  toggleSettings(): void {
    this.settingsState = this.settingsState === 'hidden' ? 'visible' : 'hidden';
    this.headerBackgroundState = this.settingsState;
  }

  rotateImage(): void {
    this.imageRotationState = this.imageRotationState === 'normal' ? 'rotated' : 'normal';
  }

  markAsRead(id: string): void {
    this.notifications = this.notifications.filter(not => not.id !== +id);
  }

}
