import { Component, OnInit, Input } from '@angular/core';
import { AccommodationInfoService } from '../accommodation-info.service';
import { Accommodation } from '../model/accommodation.model';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '../../authorization/authorization.service';

@Component({
	selector: 'app-photos',
	templateUrl: './photos.component.html',
	styleUrl: './photos.component.css',
})
export class PhotosComponent implements OnInit {
	id!: number;

	choice: string = 'overview';
	accommodation!: Accommodation;
	photos!: string[];
	role: string;

	constructor(
		private route: ActivatedRoute,
		private service: AccommodationInfoService,
		private authorization: AuthorizationService
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
}
