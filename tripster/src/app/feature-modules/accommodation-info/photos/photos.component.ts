import { Component, OnInit, Input } from '@angular/core';
import { AccommodationInfoService } from '../accommodation-info.service';
import { Accommodation } from '../model/accommodation.model';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '../../authorization/authorization.service';
import { UserAccountUpdateService } from '../../user-account-update/user-account-update.service';
import { PersonUpdate } from '../../user-account-update/model/user-update.model';

@Component({
	selector: 'app-photos',
	templateUrl: './photos.component.html',
	styleUrl: './photos.component.css',
})
export class PhotosComponent implements OnInit {
	id!: number;

	choice: string = 'overview';
	accommodation!: Accommodation;
	host!: PersonUpdate;
	photos!: string[];
	role: string;
	favorite: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private service: AccommodationInfoService,
		private authorization: AuthorizationService,
		private userService: UserAccountUpdateService
	) {
		this.role = authorization.getRole();
	}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.id = +params['id'];
		});

		this.service.getAccommodation(this.id).subscribe({
			next: (result: Accommodation) => {
				this.accommodation = result;
				this.getHost();
				this.isFavorite();
			},
			error: (err: any) => {
				console.error('Error fetching accommodation info', err);
			},
		});

		this.service.getPhotos(this.id).subscribe({
			next: (result: string[]) => {
				this.photos = result;
			},
			error: (err: any) => {
				console.error('Error fetching photos', err);
			},
		});
	}

	isAuthorized(): boolean {
		return (
			this.authorization.isLoggedIn() &&
			this.authorization.getRole() == 'ROLE_HOST' &&
			this.authorization.getPersonId() == this.accommodation.ownerId
		);
	}

	getHost() {
		if (!this.accommodation.ownerId) {
			console.error('Accommodation doesn`t contain host data.');
			return;
		}

		this.userService.getHost(this.accommodation.ownerId).subscribe({
			next: (response: PersonUpdate) => {
				this.host = response;
				console.log(this.host);
			},
			error: (err: any) => {
				console.error('Error fetching host data.', err);
			}
		});
	}

	toggleFavorite(): void {

		if (this.accommodation.id == undefined) {
			console.error('Error fetching accommodation id.');
			return;
		}

		this.service.toggleFavorite(this.authorization.getPersonId(), this.accommodation.id).subscribe({
			next: (response: number) => {
				this.favorite = !this.favorite;
				let message: string = this.favorite ? 'added to' : 'removed from';
				console.log(`Succesfully ${message} accommodation with id: ${response}`);
			},
			error: (err: any) => {
				console.error('Error toggling favorite accommodation.', err);
			}
		});
	}

	isFavorite(): void {
		if (this.accommodation.id == undefined) {
			console.error('Error fetching accommodation id.');
			return;
		}
		this.service.isFavorite(this.authorization.getPersonId(), this.accommodation.id).subscribe({
			next: (response: boolean) => {
				this.favorite = response;
			},
			error: (err: any) => {
				console.error('Error checking if favorite accommodation.', err);
			}
		});
	}

}
