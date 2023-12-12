import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../../accommodation-info/model/accommodation.model';
import { AccommodationInfoService } from '../../accommodation-info/accommodation-info.service';
import { AccommodationInfoCard } from '../../cards/accommodation-info-card/model/accommodation-info-card.model';
import { FilterService } from '../../filter/filter.service';
import { AccommodationRequest } from '../../cards/accommodation-request-card/model/accommodation-request.mode';
import { BasicFilterComponent } from '../../filter/basic-filter/basic-filter.component';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';

@Component({
	selector: 'app-filter-page',
	templateUrl: './filter-page.component.html',
	styleUrl: './filter-page.component.css',
})
export class FilterPageComponent implements OnInit {
	constructor(private service: FilterService, private fb: FormBuilder) {}

	mainFormGroup: FormGroup;

	ngOnInit(): void {
		this.service
			.getAccommodationByFiltersForGuest('dfgdfg')
			.subscribe((value: AccommodationInfoCard[]) => {
				this.accommodations = value;
			});
		// this.service
		// 	.getAccommodationRequestByFiltersForAdmin('sdfdfdf')
		// 	.subscribe((value: AccommodationRequest[]) => {
		// 		this.accommodationRequests = value;
		// 	});
		this.mainFormGroup = this.fb.group({
			basicFilter: this.fb.group({
				destination: new FormControl(''),
				checkIn: new FormControl('', Validators.required),
				checkOut: new FormControl('', Validators.required),
				numberOfGuest: new FormControl('', Validators.min(0)),
			}),
		});
	}

	onBasicFilter(data: any) {
		this.mainFormGroup.get('basicFilter')?.patchValue(data);
	}

	sendRequest() {
		if (this.mainFormGroup.get('basicFilter')?.valid) {
			console.log(this.mainFormGroup.get('baseFilter')?.value);
		}
	}

	filterTitle: string = 'Your search';
	numberOfResults: string = '120';
	title: string = 'Copenhagen, Dec 9-12, 2 guests, 1 room';

	accommodations: AccommodationInfoCard[];
	accommodationRequests: AccommodationRequest[];
}
