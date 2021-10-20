import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { PRODUCTS } from 'src/app/models/product.mock';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss'],
})
export class ProductDetailPageComponent implements OnInit {
  product: Product | undefined;

  public productList: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getProduct();

    this.productService.getItems().subscribe((res) => {
      this.productList = res;

      this.productList.forEach((a: any) => {
        Object.assign(a, { total: a.price });
      });
    });
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService
      .getProduct(id)
      .subscribe((product) => (this.product = product));
  }

  goBack(): void {
    this.location.back();
  }

  addcart(product: any) {
    if (this.productList.some((cartItem: any) => cartItem.id === product.id)) {
      product.quantity++;
    } else {
      this.productService.addtoCart(product);
      product.quantity++;
    }
  }
}
