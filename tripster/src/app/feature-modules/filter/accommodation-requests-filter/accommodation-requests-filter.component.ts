import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-accommodation-requests-filter',
	templateUrl: './accommodation-requests-filter.component.html',
	styleUrl: './accommodation-requests-filter.component.css',
})
export class AccommodationRequestsFilterComponent {
	accomodationRequests: string[] = ['NEW', 'UPDATED'];

	requestsFilter: FormGroup;

	constructor(private formBuilder: FormBuilder) {
		this.requestsFilter = this.formBuilder.group({});

		this.accomodationRequests.forEach((item) =>
			this.requestsFilter.addControl(
				item,
				this.formBuilder.control(false)
			)
		);
	}

	@Output()
	filterChange = new EventEmitter<any>();

	onFilterChange() {
		this.filterChange.emit({
			requestType: this.getSelectedCheckboxes(),
		});
	}

	getSelectedCheckboxes() {
		const selectedCheckboxes = Object.keys(
			this.requestsFilter.value
		).filter((key) => this.requestsFilter.value[key]);
		return selectedCheckboxes;
	}
}
