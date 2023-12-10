import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccommodationInfoCardComponent } from './accommodation-info-card/accommodation-info-card.component';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http:HttpClient) {
    this.nikola="";
   }

   nikola:string;
}
