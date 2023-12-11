import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  apiKey: string = 'AIzaSyBdLNWvCYOPjNfUPl-AjYGiboJBVSs4Fts';
  geocodingUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: HttpClient) { }

  getLocation(address: string) {
    const encodedAddress = encodeURIComponent(address);
    const url = `${this.geocodingUrl}?address=${encodedAddress}&key=${this.apiKey}`;

    return this.http.get(url);
  }
}
