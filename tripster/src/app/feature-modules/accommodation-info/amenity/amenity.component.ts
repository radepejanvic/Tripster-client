import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-amenity',
  templateUrl: './amenity.component.html',
  styleUrl: './amenity.component.css'
})
export class AmenityComponent {
  @Input() amenity?: number;
  @Input() checked: boolean = false;

  amenities: [string, string][] = [
    ['Wifi', './assets/amenities/wifi.svg'],
    ['Kitchen', './assets/amenities/kitchen.svg'],
    ['Parking', './assets/amenities/parking.svg'],
    ['AC', './assets/amenities/ac.svg'],
    ['TV', './assets/amenities/tv.svg'],
    ['Safe', './assets/amenities/safe.svg'],
    ['Pet friendly', './assets/amenities/pet-friendly.svg'],
    ['Free cancellation', './assets/amenities/free-cancellation.svg'],
    ['Pool', './assets/amenities/pool.svg'],
    ['Barbecue', './assets/amenities/barbecue.svg'],
    ['Washing machine', './assets/amenities/washing-machine.svg'],
    ['Sauna', './assets/amenities/sauna.svg'],
    ['Jacuzzi', './assets/amenities/jacuzzi.svg'],
  ]

}
