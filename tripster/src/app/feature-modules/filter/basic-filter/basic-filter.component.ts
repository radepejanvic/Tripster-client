import { Component, EventEmitter, Output } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	ValidationErrors,
	Validators,
} from '@angular/forms';

@Component({
	selector: 'app-basic-filter',
	templateUrl: './basic-filter.component.html',
	styleUrl: './basic-filter.component.css',
})
export class BasicFilterComponent {
	basicFilter = new FormGroup({
		destination: new FormControl(),
		checkIn: new FormControl(),
		checkOut: new FormControl(),
		numberOfGuest: new FormControl(0),
	});

	@Output()
	filterChange = new EventEmitter<any>();

	onFilterChange() {
		this.setCustomValidators();
		if (this.basicFilter.valid) {
			this.filterChange.emit(this.basicFilter.value);
		}
	}

	setCustomValidators() {
		this.basicFilter.setValidators(this.dateValidator.bind(this));
		this.basicFilter.updateValueAndValidity();
	}

	dateValidator(control: AbstractControl): ValidationErrors | null {
		var startDate = control.get('checkIn')?.value;
		var endDate = control.get('checkOut')?.value;

		if (startDate && endDate && startDate > endDate) {
			this.basicFilter.get('checkIn')?.setValue(endDate);
			startDate = endDate;
			this.basicFilter.get('checkOut')?.setValue(null);
			return null;
		}

		var today = new Date();
		today.setDate(today.getDate() - 1);
		if (startDate && new Date(startDate) < today) {
			this.basicFilter.get('checkIn')?.setValue(null);
			return null;
		}
		if (endDate && new Date(endDate) < today) {
			this.basicFilter.get('checkOut')?.setValue(null);
			return null;
		}
		if (new Date(startDate).getTime() === new Date(endDate).getTime()) {
			this.basicFilter.get('checkOut')?.setValue(null);
			return null;
		}

		return null;
	}
}
