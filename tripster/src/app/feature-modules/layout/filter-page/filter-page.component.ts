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
import { HttpParams } from '@angular/common/http';
import { Amenity } from 'src/app/shared/enum/amenity.enum';

@Component({
	selector: 'app-filter-page',
	templateUrl: './filter-page.component.html',
	styleUrl: './filter-page.component.css',
})
export class FilterPageComponent implements OnInit {
	filterTitle: string = 'Your search';
	numberOfResults: string = '120';
	title: string = 'Copenhagen, Dec 9-12, 2 guests, 1 room';

	accommodations: AccommodationInfoCard[];
	accommodationRequests: AccommodationRequest[];

	constructor(private service: FilterService, private fb: FormBuilder) {}

	mainFormGroup: FormGroup;

	ngOnInit(): void {
		// this.service
		// 	.getAccommodationRequestByFiltersForAdmin('sdfdfdf')
		// 	.subscribe((value: AccommodationRequest[]) => {
		// 		this.accommodationRequests = value;
		// 	});
		this.mainFormGroup = this.fb.group({
			basicFilter: this.fb.group({
				destination: new FormControl(null),
				checkIn: new FormControl('', Validators.required),
				checkOut: new FormControl('', Validators.required),
				numberOfGuest: new FormControl(null, Validators.min(0)),
			}),
			additionalFilter: this.fb.group({
				amenities: [],
				type: [],
				minPrice: new FormControl(null),
				maxPrice: new FormControl(null),
			}),
		});
	}

	onBasicFilter(data: any) {
		this.mainFormGroup.get('basicFilter')?.patchValue(data);
	}
	onAdditionalFilter(data: any) {
		this.mainFormGroup.get('additionalFilter')?.patchValue(data);
	}

	sendRequest() {
		if (this.mainFormGroup.get('basicFilter')?.valid) {
			let params = this.getParams();

			console.log(params.toString());

			this.service
				.getAccommodationByFiltersForGuest(params)
				.subscribe((value: AccommodationInfoCard[]) => {
					this.accommodations = value;
				});
		}
	}

	getParams(): HttpParams {
		const additionalFilter =
			this.mainFormGroup.get('additionalFilter')?.value;
		const basicFilter = this.mainFormGroup.get('basicFilter')?.value;

		var params = new HttpParams()
			.set('start', new Date(basicFilter.checkIn).getTime())
			.set('end', new Date(basicFilter.checkOut).getTime());

		if (
			basicFilter.destination !== null &&
			basicFilter.destination !== ''
		) {
			console.log('city');
			params = params.append('city', basicFilter.destination);
		}
		if (basicFilter.numberOfGuest !== null) {
			console.log('numOfGuests');
			params = params.append('numOfGuests', basicFilter.numberOfGuest);
		}
		if (additionalFilter.maxPrice !== null) {
			console.log('maxPrice');
			params = params.append('maxPrice', additionalFilter.maxPrice);
		}
		if (additionalFilter.minPrice !== null) {
			console.log('minPrice');
			params = params.append('minPrice', additionalFilter.minPrice);
		}
		if (
			additionalFilter.amenities !== null &&
			additionalFilter.amenities.length !== 0
		) {
			console.log('amenities');
			params = params.append('amenities', additionalFilter.amenities);
		}
		if (
			additionalFilter.type !== null &&
			additionalFilter.type.length !== 0
		) {
			console.log('type');
			params = params.append('type', additionalFilter.type);
		}

		return params;
	}
}
