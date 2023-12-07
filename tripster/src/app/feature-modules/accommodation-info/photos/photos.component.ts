import { Component, OnInit, Input } from '@angular/core';
import { AccommodationInfoService } from '../accommodation-info.service';
import { Accommodation } from '../model/accommodation.model';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent implements OnInit {

  @Input() id: number | undefined;

  accommodation!: Accommodation;
  photos!: string[];

  constructor(private service: AccommodationInfoService) { }

  ngOnInit(): void {
    this.service.getAccommodation(12).subscribe({
      next: (result: Accommodation) => {
        this.accommodation = result;
        console.log(result);
      },
      error: (err: any) => {
        console.error('Error fetching accommodation info', err);
      }
    });

    this.service.getPhotos(12).subscribe({
      next: (result: string[]) => {
        this.photos = result;
        console.log(result);
      },
      error: (err: any) => {
        console.error('Error fetching photos', err);
      }
    })

  }

}
