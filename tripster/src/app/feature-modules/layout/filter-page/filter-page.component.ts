import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../../accommodation-info/model/accommodation.model';
import { AccommodationInfoService } from '../../accommodation-info/accommodation-info.service';
import { AccommodationInfoCard } from '../../cards/accommodation-info-card/model/accommodation-info-card.model';
import { FilterService } from '../../filter/filter.service';
import { AccommodationRequest } from '../../cards/accommodation-request-card/model/accommodation-request.mode';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrl: './filter-page.component.css'
})
export class FilterPageComponent implements OnInit{
  constructor(private service:FilterService){}
  ngOnInit(): void {
    this.service.getAccommodationByFiltersForGuest("dfgdfg").subscribe(
      (value:AccommodationInfoCard[]) =>{
        this.accommodations = value;
      }
    )
    this.service.getAccommodationRequestByFiltersForAdmin("sdfdfdf").subscribe(
      (value:AccommodationRequest[])=>{
        this.accommodationRequests = value;
      }
    )
  }

  filterTitle:string = "Your search"
  numberOfResults:string = "120"
  title:string = "Copenhagen, Dec 9-12, 2 guests, 1 room"

  accommodations:AccommodationInfoCard[];
  accommodationRequests:AccommodationRequest[];
 
}
