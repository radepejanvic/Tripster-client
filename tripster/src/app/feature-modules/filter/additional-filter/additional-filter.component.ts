import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Amenity } from 'src/app/shared/enum/amenity.enum';

@Component({
	selector: 'app-additional-filter',
	templateUrl: './additional-filter.component.html',
	styleUrl: './additional-filter.component.css',
})
export class AdditionalFilterComponent {
	amenities: string[] = ['WIFI', 'KITCHEN', 'PARKING'];
	accommodationTypes: string[] = ['ROOM', 'STUDIO', 'APARTMENT'];

	additonalFilter: FormGroup;

	constructor(private formBuilder: FormBuilder) {
		this.additonalFilter = this.formBuilder.group({});

		this.amenities.forEach((item) =>
			this.additonalFilter.addControl(
				item,
				this.formBuilder.control(false)
			)
		);

		this.additonalFilter.addControl('minPrice', new FormControl(null));
		this.additonalFilter.addControl('maxPrice', new FormControl(null));
		this.additonalFilter.addControl('type', new FormControl(null));
	}

	getSelectedCheckboxes() {
		const selectedCheckboxes = Object.keys(
			this.additonalFilter.value
		).filter(
			(key) =>
				this.additonalFilter.value[key] &&
				key !== 'minPrice' &&
				key !== 'maxPrice' &&
				key !== 'type'
		);
		return selectedCheckboxes;
	}

	@Output()
	filterChange = new EventEmitter<any>();

	onFilterChange() {
		this.filterChange.emit({
			amenities: this.getAmenityIds(this.getSelectedCheckboxes()),
			type: this.additonalFilter.get('type')?.value,
			minPrice: this.additonalFilter.get('minPrice')?.value,
			maxPrice: this.additonalFilter.get('maxPrice')?.value,
		});
	}

	getAmenityIds(list: string[]): number[] {
		let ids: number[] = [];
		list.forEach((item) => {
			ids.push(this.amenities.indexOf(item) + 1);
		});

		return ids;
	}
}
