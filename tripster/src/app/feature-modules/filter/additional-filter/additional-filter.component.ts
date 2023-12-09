import { Component } from '@angular/core';

@Component({
  selector: 'app-additional-filter',
  templateUrl: './additional-filter.component.html',
  styleUrl: './additional-filter.component.css'
})
export class AdditionalFilterComponent {

  amenities: string[] = ['Opcija 1', 'Opcija 2', 'Opcija 3', 'Opcija 2', 'Opcija 3', 'Opcija 2', 'Opcija 3', 'Opcija 2', 'Opcija 3', 'Opcija 2', 'Opcija 3'];
  accommodationTypes: string[] = ['ROOM', 'STUDIO', 'APARTMENT'];
}
