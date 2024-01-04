import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reservation-status-filter',
  templateUrl: './reservation-status-filter.component.html',
  styleUrl: './reservation-status-filter.component.css',
})
export class ReservationStatusFilterComponent {
  reservationStatus: string[] = [
    'PENDING',
    'ACCEPTED',
    'CANCELLED',
    'REJECTED',
  ];

  requestsFilter: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.requestsFilter = this.formBuilder.group({});

    this.reservationStatus.forEach((item) =>
      this.requestsFilter.addControl(item, this.formBuilder.control(false))
    );
  }

  @Output()
  filterChange = new EventEmitter<any>();

  onFilterChange() {
    this.filterChange.emit({
      reservationType: this.getSelectedCheckboxes(),
    });
  }

  getSelectedCheckboxes() {
    const selectedCheckboxes = Object.keys(this.requestsFilter.value).filter(
      (key) => this.requestsFilter.value[key]
    );
    return selectedCheckboxes;
  }
}
