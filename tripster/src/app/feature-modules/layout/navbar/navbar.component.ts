import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../authorization/authorization.service';
import { Route, Router } from '@angular/router';
import { Notification } from '../../notification/model/notification.model';
import { NotificationService } from '../../notification/notification.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
	role: string = '';
	notifications: Notification[] = [];

	constructor(
		private authService: AuthorizationService,
		private notificationService: NotificationService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.authService.userState.subscribe((result) => {
			this.role = result;
		});

		if (this.authService.getRole() != 'ROLE_ADMIN') {
			this.notificationService.getUnreadNotifications(this.authService.getUserId()).subscribe({
				next: (response: Notification[]) => {
					this.notifications = response;
					console.log(`Fetched ${response.length} unread notifications.`);
				},
				error: (err: any) => {
					console.error('Error fetching notifications. ', err);
				}
			})
		}
	}

	logOut(): void {
		this.authService.logout().subscribe({
			next: (_) => {
				localStorage.removeItem('user');
				localStorage.removeItem('userID');
				localStorage.removeItem('personID');
				this.authService.setRole();
			},
		});
	}
}
