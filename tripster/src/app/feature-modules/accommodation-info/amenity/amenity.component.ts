import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-amenity',
  templateUrl: './amenity.component.html',
  styleUrl: './amenity.component.css'
})
export class AmenityComponent {
  @Input() amenity: string | undefined;
}
