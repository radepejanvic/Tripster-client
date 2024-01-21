import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../authorization/authorization.service';
import { Route, Router } from '@angular/router';
import { Notification } from '../../notification/model/notification.model';
import { NotificationService } from '../../notification/notification.service';
import { SettingsService } from '../../notification/settings.service';
import { Settings } from '../../notification/model/settings.model';
import { environment } from 'src/env/env';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
	role: string = '';
	notifications: Notification[] = [];
	// settings: Settings;

	private serverUrl = environment.socket + 'socket'
	private stompClient: any;

	constructor(
		private authService: AuthorizationService,
		private notificationService: NotificationService,
		private settingsService: SettingsService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.authService.userState.subscribe((result) => {
			this.role = result;
		});

		if (this.authService.getRole() == 'ROLE_ADMIN') return;


		this.settingsService.getSettings(this.authService.getUserId()).subscribe({
			next: (response: Settings) => {
				localStorage.setItem('settings', JSON.stringify(response));
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
				this.notifications = this.notificationService.filterNotifications(response, this.settingsService.accessSettings());
				console.log(`Fetched ${response.length} unread notifications.`);
			},
			error: (err: any) => {
				console.error('Error fetching notifications. ', err);
			}
		})
	}

	logOut(): void {
		this.authService.logout().subscribe({
			next: (_) => {
				localStorage.removeItem('user');
				localStorage.removeItem('userID');
				localStorage.removeItem('personID');
				localStorage.removeItem('settings');
				this.authService.setRole();
			},
		});
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

			if (this.notificationService.getFilterFromSettings(this.settingsService.accessSettings()).includes(notification.type)) {
				console.log('TimeStamp: ', notification.timeStamp);
				this.notifications.push(notification);
			}
		}
	}
}
