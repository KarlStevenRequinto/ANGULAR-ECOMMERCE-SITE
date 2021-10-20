import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Product } from '../models/product.interface';
import { PRODUCTS } from 'src/app/models/product.mock';
import { InteractionService } from './interaction.service';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor(private interactionService: InteractionService) {}

  // DASHBOARD AND SEARCH COMPONENT
  getProducts(): Observable<Product[]> {
    const products = of(PRODUCTS);
    this.interactionService.add('InteractionService: fetched products');
    return products;
  }
  getProduct(id: number): Observable<Product> {
    const product = PRODUCTS.find((x) => x.id === id)!;
    this.interactionService.add(`ProductService: fetched product id=${id}`);
    return of(product);
  }

  // ADD TO CART SECTION
  
  getItems() {
    return this.productList.asObservable();
  }

  setItems(productItem: any) {
    this.cartItemList.push(...productItem);
    this.productList.next(productItem);
  }

  addtoCart(productItem: any) {
    this.cartItemList.push(productItem);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total * a.quantity;
    });

    return grandTotal;
  }

  removeCartItem(productItem: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (productItem.id === a.id) {
        this.cartItemList.splice(index,1);
      }
    });
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

  // SEARCH
  userInput = '';

  updateUserInput(input: string) {
    this.userInput = input;
    return this.userInput;
  }

  getUserInput() {
    return this.userInput;
  }
}
