import { Component, OnInit, Input } from '@angular/core';
import { AccommodationInfoService } from '../accommodation-info.service';
import { Accommodation } from '../model/accommodation.model';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route:ActivatedRoute,
    private service: AccommodationInfoService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      const id = +params['id']
      this.service.getAccommodation(id).subscribe({
        next: (result: Accommodation) => {
          this.accommodation = result;
        },
        error: (err: any) => {
          console.error('Error fetching accommodation info', err);
        }
      });
  
      this.service.getPhotos(id).subscribe({
        next: (result: string[]) => {
          this.photos = result;
        },
        error: (err: any) => {
          console.error('Error fetching photos', err);
        }
      })
    })

  }

  onClick(choice: string): void {
    this.choice = choice;
  }

  justClick() {
    console.log('Neki tekst');
  }

}
