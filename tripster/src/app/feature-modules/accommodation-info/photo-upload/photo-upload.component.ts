import { Component, Input, Output } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { AccommodationInfoService } from '../accommodation-info.service';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrl: './photo-upload.component.css'
})
export class PhotoUploadComponent {
  files: File[] = [];
  urls: string[] = [];

  constructor(private accommodationService: AccommodationInfoService) { }

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
    const id = sessionStorage.getItem('newAccommodation');
    if (id != null && this.files.length <= 10 && this.files.length >= 5) {
      this.accommodationService.uploadPhotos(+id, this.files).subscribe({
        next: (response: number) => {
          console.log(`Uploaded ${response} photos to accommodation with id: ${id}`);
          this.files = [];
          this.urls = [];
        },
        error: (err: any) => {
          console.error('Failed to upload photos', err);
        }
      })
    }
  }

  removePhotos(): void {
    this.files = [];
    this.urls = [];
  }


}
