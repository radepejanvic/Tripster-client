import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GeocodingService } from '../geocoding.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, OnChanges {

  @Input() address: string = '';
  @Input() latitude: number = 0;
  @Input() longitude: number = 0;

  center!: google.maps.LatLngLiteral;
  map!: google.maps.Map;
  mapOptions: google.maps.MapOptions = {
    maxZoom: 17,
    zoom: 13,
    minZoom: 3
  };

  constructor(private geocodingService: GeocodingService) { }
  ngOnInit() {
    if (this.address != '') {
      this.centerByAddress();
    }

    if (this.latitude != 0 && this.longitude != 0) {
      this.centerByLatLong();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['address']) {
      this.centerByAddress();
    }
    if (changes['latitude'] || changes['longitude']) {
      this.centerByLatLong();
    }
  }

  centerByAddress() {
    this.geocodingService.getLocation(this.address).subscribe((data: any) => {
      this.center = data.results[0].geometry.location;
    });
    this.map.setCenter(this.center);
  }

  centerByLatLong() {
    this.center.lat = this.latitude;
    this.center.lng = this.longitude;
    this.map.setCenter(this.center);
  }

}
