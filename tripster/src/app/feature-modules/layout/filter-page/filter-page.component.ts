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
import { AuthorizationService } from '../../authorization/authorization.service';
import { UtilService } from 'src/app/shared/util.service';

@Component({
	selector: 'app-filter-page',
	templateUrl: './filter-page.component.html',
	styleUrl: './filter-page.component.css',
})
export class FilterPageComponent implements OnInit {
	filterTitle: string = 'Your search';
	title: string = 'Search results';

	accommodations: AccommodationInfoCard[];
	accommodationRequests: AccommodationRequest[];
	role: string = '';

	constructor(
		private service: FilterService,
		private fb: FormBuilder,
		private authService: AuthorizationService,
		private util: UtilService
	) {
		this.accommodations = [];
		this.accommodationRequests = [];
	}

	mainFormGroup: FormGroup;

	ngOnInit(): void {
		this.authService.userState.subscribe((result) => {
			this.role = result;
		});

		if (this.role == 'ROLE_ADMIN') {
			this.service
				.getAccommodationRequestByFiltersForAdmin(new HttpParams())
				.subscribe((value: AccommodationRequest[]) => {
					this.accommodationRequests = value;
					value.map((item) => {
						item.url = this.util.base64ToDataURL(item.photo);
					});
				});
		}

		this.mainFormGroup = this.fb.group({
			basicFilter: this.fb.group({
				destination: new FormControl(null),
				checkIn: new FormControl('', Validators.required),
				checkOut: new FormControl('', Validators.required),
				numberOfGuest: new FormControl(null, Validators.min(0)),
			}),
			additionalFilter: this.fb.group({
				amenities: [],
				type: new FormControl(null),
				minPrice: new FormControl(null),
				maxPrice: new FormControl(null),
			}),
			accommodationRequestsFilter: this.fb.group({
				requestType: [],
			}),
		});
	}

	onBasicFilter(data: any) {
		this.mainFormGroup.get('basicFilter')?.patchValue(data);
	}
	onAdditionalFilter(data: any) {
		this.mainFormGroup.get('additionalFilter')?.patchValue(data);
	}
	onAccommodationRequestsFilter(data: any) {
		this.mainFormGroup.get('accommodationRequestsFilter')?.patchValue(data);
	}

	sendRequest() {
		if (this.role == 'ROLE_ADMIN') {
			this.service
				.getAccommodationRequestByFiltersForAdmin(this.getAdminParams())
				.subscribe((value: AccommodationRequest[]) => {
					this.accommodationRequests = value;
					value.map((item) => {
						item.url = this.util.base64ToDataURL(item.photo);
					});
				});
		} else {
			if (this.mainFormGroup.get('basicFilter')?.valid) {
				this.service
					.getAccommodationByFiltersForGuest(this.getParams())
					.subscribe((value: AccommodationInfoCard[]) => {
						this.accommodations = value;

						value.map((item) => {
							item.url = this.util.base64ToDataURL(item.photo);
						});
					});
			}
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
			params = params.append('city', basicFilter.destination);
		}
		if (basicFilter.numberOfGuest !== null) {
			params = params.append('numOfGuests', basicFilter.numberOfGuest);
		}
		if (additionalFilter.maxPrice !== null) {
			params = params.append('maxPrice', additionalFilter.maxPrice);
		}
		if (additionalFilter.minPrice !== null) {
			params = params.append('minPrice', additionalFilter.minPrice);
		}
		if (
			additionalFilter.amenities !== null &&
			additionalFilter.amenities.length !== 0
		) {
			params = params.append('amenities', additionalFilter.amenities);
		}
		if (additionalFilter.type !== null && additionalFilter.type !== '') {
			params = params.append('type', additionalFilter.type);
		}

		return params;
	}
	getAdminParams(): HttpParams {
		var params = new HttpParams();
		const accommodationRequestsFilter = this.mainFormGroup.get(
			'accommodationRequestsFilter'
		)?.value;
		if (
			accommodationRequestsFilter.requestType !== null &&
			accommodationRequestsFilter.requestType.length !== 0
		) {
			params = params.append(
				'statusList',
				accommodationRequestsFilter.requestType
			);
		}
		return params;
	}
}
