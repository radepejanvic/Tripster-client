import { Component } from '@angular/core';

@Component({
  selector: 'app-time-filter',
  templateUrl: './time-filter.component.html',
  styleUrl: './time-filter.component.css'
})
export class TimeFilterComponent {
  timeFilters: string[] = ['Closest', 'Furthest', 'Any'];
}
