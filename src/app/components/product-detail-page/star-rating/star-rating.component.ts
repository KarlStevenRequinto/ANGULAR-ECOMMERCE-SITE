import { Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})

export class StarRatingComponent implements OnChanges {
  @Input() rating: number = 0;

  ngOnChanges () {
    this.rating;
  }
}

/*
export class NgbdRatingDecimal {
  currentRate = 3.14;
}
*/

