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

  choice: string = "overview";
  accommodation!: Accommodation;
  photos!: string[];

  constructor(private service: AccommodationInfoService) { }

  ngOnInit(): void {
    this.service.getAccommodation(1).subscribe({
      next: (result: Accommodation) => {
        this.accommodation = result;
      },
      error: (err: any) => {
        console.error('Error fetching accommodation info', err);
      }
    });

    this.service.getPhotos(1).subscribe({
      next: (result: string[]) => {
        this.photos = result;
      },
      error: (err: any) => {
        console.error('Error fetching photos', err);
      }
    })

  }

  onClick(choice: string): void {
    this.choice = choice;
  }

  justClick() {
    console.log('Neki tekst');
  }

}
