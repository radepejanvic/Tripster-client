import { Component, Input } from '@angular/core';
import { AccommodationRequest } from './model/accommodation-request.mode';

@Component({
	selector: 'app-accommodation-request-card',
	templateUrl: './accommodation-request-card.component.html',
	styleUrl: './accommodation-request-card.component.css',
})
export class AccommodationRequestCardComponent {
	@Input()
	accommodation: AccommodationRequest;
}
