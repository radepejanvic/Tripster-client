import { Component } from '@angular/core';

@Component({
  selector: 'app-accommodation-requests-filter',
  templateUrl: './accommodation-requests-filter.component.html',
  styleUrl: './accommodation-requests-filter.component.css'
})
export class AccommodationRequestsFilterComponent {

  accomodationRequests:string[]=['New accomodation','Updated accomodation']
}
