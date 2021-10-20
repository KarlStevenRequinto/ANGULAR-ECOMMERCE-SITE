import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // Code for addtocart functionality
  public totalItem: number = 0;
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  //// cart
  ngOnInit(): void {
    this.productService.getItems().subscribe((res) => {
      this.totalItem = res.length;
      console.log(res);
    });
  }

  // search bar
  searchInput: string = '';
  searchTerm: string = '';

  get _searchInput(): string {
    return this.searchInput;
  }
  set _searchInput(value: string) {
    this.searchInput = value;
  }

  getInput(searchInput: string) {
    this.productService.updateUserInput(this.searchInput);
    this.router.navigateByUrl('/search/' + this.searchInput);
  }
}
