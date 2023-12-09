import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrl: './filter-page.component.css'
})
export class FilterPageComponent {

  filterTitle:string = "Your search"
  numberOfResults:string = "120"
  title:string = "Copenhagen, Dec 9-12, 2 guests, 1 room"
}
