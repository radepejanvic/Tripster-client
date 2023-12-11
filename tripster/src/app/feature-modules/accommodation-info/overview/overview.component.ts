import { Component, Input } from '@angular/core';
import { Accommodation } from '../model/accommodation.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  @Input() accommodation: Accommodation | undefined;

  myLatLng: { lat: number, lng: number } = { lat: 42.546, lng: 21.882 };
  mapOptions: google.maps.MapOptions = {
    center: this.myLatLng,
    zoom: 15
  };

}
