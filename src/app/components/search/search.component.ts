import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public searchInput = '';

  filteredProducts: Product[] = [];
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {
    // returns to OnInit
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  performSearch(searchInput: string): Product[] {
    searchInput = searchInput.toLocaleLowerCase();
    return this.products.filter(
      (product: Product) =>
        product.name.toLocaleLowerCase().includes(searchInput) ||
        product.description.toLocaleLowerCase().includes(searchInput)
    );
  }

  ngOnInit(): void {
    this.getFilteredProducts();
    this.searchInput = this.productService.getUserInput();
    this.filteredProducts = this.performSearch(this.searchInput);
  }

  getFilteredProducts(): void {
    this.productService
      .getProducts()
      .subscribe((products) => (this.products = products));
  }
}
