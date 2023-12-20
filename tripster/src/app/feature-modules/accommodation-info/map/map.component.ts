import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GeocodingService } from '../geocoding.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

  @Input() address: string = '';

  center!: google.maps.LatLngLiteral;
  map!: google.maps.Map;

  myLatLng: { lat: number, lng: number } = { lat: 42.546, lng: 21.882 };

  mapOptions: google.maps.MapOptions = {
    maxZoom: 17,
    zoom: 13,
    minZoom: 3
  };

  constructor(private geocodingService: GeocodingService) { }
  ngOnInit() {

    this.geocodingService.search(this.address).subscribe({
      next: (result: any) => {
        console.log(result);
        this.myLatLng = { lat: Number(result[0].lat), lng: Number(result[0].lon) };
        console.log(this.myLatLng);
        this.mapOptions = {
          center: this.myLatLng,
          zoom: 15
        };
      },
      error: (err: any) => {
        console.error('Failed to find location.', err);
      }
    });
  }
}

