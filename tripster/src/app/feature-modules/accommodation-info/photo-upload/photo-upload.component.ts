import { Component, Output } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrl: './photo-upload.component.css'
})
export class PhotoUploadComponent {
  files: File[] = [];
  urls: string[] = [];

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
}
