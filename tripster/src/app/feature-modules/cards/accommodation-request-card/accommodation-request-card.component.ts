import { Component, Input } from '@angular/core';
import { AccommodationRequest } from './model/accommodation-request.mode';
import { CardService } from '../card.service';

@Component({
	selector: 'app-accommodation-request-card',
	templateUrl: './accommodation-request-card.component.html',
	styleUrl: './accommodation-request-card.component.css',
})
export class AccommodationRequestCardComponent {
	@Input()
	accommodation: AccommodationRequest;

	constructor(private service: CardService) {}

	accepted(id: number) {
		this.service.accepted(id).subscribe((value) => {
			console.log(value);
		});
	}
	suspended(id: number) {
		this.service.suspended(id).subscribe((value) => {
			console.log(value);
		});
	}
}
