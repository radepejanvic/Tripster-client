import { Component, OnInit } from '@angular/core';
import { Notification } from '../model/notification.model';
import { NotificationService } from '../notification.service';
import { AuthorizationService } from '../../authorization/authorization.service';

import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { environment } from 'src/env/env';
import { Message } from 'primeng/api';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Settings } from '../model/settings.model';
import { SettingsService } from '../settings.service';

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
  role: string;
  settings: Settings;

  settingsState: 'hidden' | 'visible' = 'hidden';
  headerBackgroundState: 'hidden' | 'visible' = 'hidden';
  imageRotationState: 'normal' | 'rotated' = 'normal';

  private serverUrl = environment.socket + 'socket'
  private stompClient: any;

  constructor(private notificationService: NotificationService,
    private settingsService: SettingsService,
    private authService: AuthorizationService) {
    this.role = authService.getRole();
  }

  ngOnInit(): void {
    this.settingsService.getSettings(this.authService.getUserId()).subscribe({
      next: (response: Settings) => {
        this.settings = response;
        localStorage.setItem('settings', JSON.stringify(this.settings));
        this.loadNotifications();
        console.log(`Succssesfully fetched settings: ${response}!`);
      },
      error: (err: any) => {
        console.error('Error fetching settings. ', err);
      }
    })

    this.initializeWebSocketConnection();
  }

  loadNotifications(): void {

    this.notificationService.getUnreadNotifications(this.authService.getUserId()).subscribe({
      next: (response: Notification[]) => {
        this.notifications = this.notificationService.filterNotifications(response, this.settings);
        console.log(`Fetched ${response.length} unread notifications.`);
      },
      error: (err: any) => {
        console.error('Error fetching notifications. ', err);
      }
    })

  }

  initializeWebSocketConnection() {

    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({}, function () {
      that.openSocket();
    });

  }

  openSocket() {
    this.stompClient.subscribe("/socket-publisher/" + this.authService.getUserId(), (message: { body: string; }) => {
      this.handleResult(message);
    });
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


  saveSettings(): void {
    this.settingsService.saveSettings(this.settings).subscribe({
      next: (response: Settings) => {
        this.settings = response;
        this.loadNotifications();
        console.log(`Succssesfully saved settings: ${response}!`);
      },
      error: (err: any) => {
        console.error('Error saving settings. ', err);
      }
    })
  }


}
