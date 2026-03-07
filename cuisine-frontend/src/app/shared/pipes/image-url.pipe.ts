import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl',
  standalone: true
})
export class ImageUrlPipe implements PipeTransform {
  private readonly apiUrl = 'http://localhost:8080';

  transform(value: string | null | undefined): string {
    if (!value) {
      return 'https://via.placeholder.com/300x200?text=No+Image';
    }
    
    // If it's already a full URL, return as is
    if (value.startsWith('http://') || value.startsWith('https://')) {
      return value;
    }
    
    // If it's a storage path, prepend the API URL
    if (value.startsWith('/storage/')) {
      return this.apiUrl + value;
    }
    
    return value;
  }
}
