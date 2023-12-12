import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-basic-filter',
	templateUrl: './basic-filter.component.html',
	styleUrl: './basic-filter.component.css',
})
export class BasicFilterComponent {
	basicFilter = new FormGroup({
		destination: new FormControl(''),
		checkIn: new FormControl(''),
		checkOut: new FormControl(''),
		numberOfGuest: new FormControl(''),
	});

	@Output()
	filterChange = new EventEmitter<any>();

	onFilterChange() {
		this.filterChange.emit(this.basicFilter.value);
	}
}
