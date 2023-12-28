import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../authorization/authorization.service';
import { Route, Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
	role: string = '';

	constructor(
		private authService: AuthorizationService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.authService.userState.subscribe((result) => {
			this.role = result;
		});
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
