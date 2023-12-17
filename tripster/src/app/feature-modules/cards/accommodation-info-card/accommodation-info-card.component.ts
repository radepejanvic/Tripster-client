import { Component, Input, OnInit } from '@angular/core';
import { AccommodationInfoCard } from './model/accommodation-info-card.model';

@Component({
	selector: 'app-accommodation-info-card',
	templateUrl: './accommodation-info-card.component.html',
	styleUrl: './accommodation-info-card.component.css',
})
export class AccommodationInfoCardComponent {
	@Input()
	accommodation: AccommodationInfoCard;
}
