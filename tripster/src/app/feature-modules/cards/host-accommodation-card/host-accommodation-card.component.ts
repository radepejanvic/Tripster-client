import { Component, Input } from '@angular/core';
import { AccommodationInfoCard } from '../accommodation-info-card/model/accommodation-info-card.model';

@Component({
	selector: 'app-host-accommodation-card',
	templateUrl: './host-accommodation-card.component.html',
	styleUrl: './host-accommodation-card.component.css',
})
export class HostAccommodationCardComponent {
	@Input()
	accommodation: AccommodationInfoCard;
}
