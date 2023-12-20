import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

    return this.http.get(url, { headers: new HttpHeaders({ skip: 'true' }) });
  }

  search(address: string): Observable<any> {
    return this.http.get(
      'https://nominatim.openstreetmap.org/search?format=json&q=' + address);
  }
}