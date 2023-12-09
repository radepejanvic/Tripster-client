import { Component, Input } from '@angular/core';
import { Accommodation } from '../model/accommodation.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  @Input() accommodation: Accommodation | undefined;
}
