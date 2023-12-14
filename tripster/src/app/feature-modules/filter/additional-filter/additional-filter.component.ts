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
		this.accommodationTypes.forEach((item) =>
			this.additonalFilter.addControl(
				item,
				this.formBuilder.control(false)
			)
		);

		this.additonalFilter.addControl('minPrice', new FormControl(0));
		this.additonalFilter.addControl('maxPrice', new FormControl(0));
	}

	getSelectedCheckboxes() {
		const selectedCheckboxes = Object.keys(
			this.additonalFilter.value
		).filter(
			(key) =>
				this.additonalFilter.value[key] &&
				key !== 'minPrice' &&
				key !== 'maxPrice'
		);
		return selectedCheckboxes;
	}

	@Output()
	filterChange = new EventEmitter<any>();

	onFilterChange() {
		const types: string[] = [];
		const selectedAmenities: string[] = [];

		const selectedItems = this.getSelectedCheckboxes();
		selectedItems.forEach((item) => {
			if (this.accommodationTypes.includes(item)) {
				types.push(item);
			} else {
				selectedAmenities.push(item);
			}
		});

		this.filterChange.emit({
			amenities: this.getAmenityIds(selectedAmenities),
			type: types,
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
