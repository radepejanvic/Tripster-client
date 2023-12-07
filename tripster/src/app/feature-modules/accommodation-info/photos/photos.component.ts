import { Component, OnInit } from '@angular/core';
import { AccommodationInfoService } from '../accommodation-info.service';
import { Accommodation } from '../model/accommodation.model';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent implements OnInit {

  accommodation!: Accommodation;

  constructor(private service: AccommodationInfoService) { }

  ngOnInit(): void {
    this.service.getAccommodation(12).subscribe({
      next: (result: Accommodation) => {
        this.accommodation = result;
        console.log(result);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

}
