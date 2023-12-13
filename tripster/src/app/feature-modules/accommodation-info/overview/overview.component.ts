import { Component, Input, OnInit } from '@angular/core';
import { Accommodation } from '../model/accommodation.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})

export class OverviewComponent {

  @Input() accommodation: Accommodation | undefined;

  formatAddress(): string {
    return `${this.accommodation?.street} ${this.accommodation?.number}, ${this.accommodation?.city}, ${this.accommodation?.country}`
  }

}
