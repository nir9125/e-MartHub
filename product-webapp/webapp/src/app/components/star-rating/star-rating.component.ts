import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Output() rated = new EventEmitter<number>();

  stars: number[] = [1, 2, 3, 4, 5];

  rate(rating: number): void {
    this.rating = rating;
    this.rated.emit(this.rating);
  }
}
