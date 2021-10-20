import { Component, OnInit } from '@angular/core';
import { IReviews, Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { PRODUCTS } from 'src/app/models/product.mock';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];

  sum = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getStarAve();
  }
  getProducts(): void {
    this.productService
      .getProducts()
      .subscribe((products) => (this.products = products));
  }

  getStarAve() {
    for (let product of this.products) {
      let averageRating = 0;
      for (let review of product.reviews) {
        averageRating = averageRating + review.rating;
      }
      product.averageRating = averageRating / product.reviews.length;
    }
  }
}
