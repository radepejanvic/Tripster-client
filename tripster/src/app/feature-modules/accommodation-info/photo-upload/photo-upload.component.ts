import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { AccommodationInfoService } from '../accommodation-info.service';
import { Photo } from '../model/accommodation.model';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrl: './photo-upload.component.css'
})
export class PhotoUploadComponent implements OnInit {
  @Output() step: EventEmitter<string> = new EventEmitter<string>();

  id: number;
  files: File[] = [];
  urls: string[] = [];
  mode: string;

  savedPhotos: Photo[] = [];
  selectedPhotos: number[] = [];

  constructor(private accommodationService: AccommodationInfoService) { }

  ngOnInit(): void {
    this.setIdAndMode();
    if (this.mode == 'update') {
      this.getPhotos();
    }
  }

  onDrop(event: NgxDropzoneChangeEvent): void {
    if (event.addedFiles) {
      const fileArray = Array.from(event.addedFiles);
      this.handleFiles(fileArray);
    }
  }

  onSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const fileArray = Array.from(input.files);
      this.handleFiles(fileArray);
    }
  }

  private handleFiles(files: File[]): void {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files[i]);
      this.generateImagePreview(files[i]);
    }
  }

  private generateImagePreview(file: File): void {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result) {
        this.urls.push(event.target.result as string);
      }
    };

    reader.readAsDataURL(file);
  }

  uploadPhotos(): void {
    if (this.id != null && this.files.length <= 10 && this.files.length >= 5) {
      this.accommodationService.uploadPhotos(this.id, this.files).subscribe({
        next: (response: number) => {
          console.log(`Uploaded ${response} photos to accommodation with id: ${this.id}`);
          this.files = [];
          this.urls = [];
          this.getPhotos();
          this.mode = 'update';
          this.step.emit('photo-upload');
        },
        error: (err: any) => {
          console.error('Failed to upload photos', err);
        }
      })
    }
  }

  updatePhotos(): void {
    if (this.id != null && this.files.length <= 10 - this.savedPhotos.length) {
      this.accommodationService.uploadPhotos(this.id, this.files).subscribe({
        next: (response: number) => {
          console.log(`Uploaded ${response} photos to accommodation with id: ${this.id}`);
          this.files = [];
          this.urls = [];
          this.getPhotos();
        },
        error: (err: any) => {
          console.error('Failed to upload photos', err);
        }
      })
    }
  }

  getPhotos(): void {
    this.accommodationService.getPhotosWithIds(this.id).subscribe({
      next: (response: Photo[]) => {
        this.savedPhotos = response;
      },
      error: (err: any) => {
        console.error('Failed to get saved photos.', err);
      }
    })
  }

  removePhotos(): void {
    this.files = [];
    this.urls = [];
  }

  removeSelectedPhotos(): void {
    this.accommodationService.deleteBatchPhotos(this.selectedPhotos).subscribe({
      next: (response: number) => {
        console.log(`Deleted ${response} photos.`);
        this.removeSelectedPhotosFromSaved();
        this.selectedPhotos = [];
      },
      error: (err: any) => {
        console.error('Failed to delete saved photos.', err);
      }
    });

  }

  removeSelectedPhotosFromSaved(): void {
    this.savedPhotos = this.savedPhotos.filter(photo => !this.selectedPhotos.includes(photo.id));
  }

  toggleSelection(photoId: number): void {
    const index = this.selectedPhotos.indexOf(photoId);
    if (index === -1) {
      this.selectedPhotos.push(photoId);
    } else {
      this.selectedPhotos.splice(index, 1);
    }
  }

  isSelected(photoId: number): boolean {
    return this.selectedPhotos.includes(photoId);
  }

  setIdAndMode() {
    let id = sessionStorage.getItem('updatedAccommodation');
    if (id && !isNaN(+id)) {
      this.id = +id;
      this.mode = 'update';
      return;
    }

    id = sessionStorage.getItem('newAccommodation');
    if (id && !isNaN(+id)) {
      this.id = +id;
    }
  }
}
