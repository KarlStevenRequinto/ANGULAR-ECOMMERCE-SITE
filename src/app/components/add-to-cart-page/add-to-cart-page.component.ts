import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-to-cart-page',
  templateUrl: './add-to-cart-page.component.html',
  styleUrls: ['./add-to-cart-page.component.scss'],
})
export class AddToCartPageComponent implements OnInit {
  closeResult: string = '';
  public products: any = [];
  public grandTotal!: number;
  public totalItem: number = 0;
  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.productService.getItems().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.productService.getTotalPrice();
      this.totalItem = res.length;
    });
  }
  // REMOVING ONE ITEM FROM THE CART
  removeItem(item: any) {
    this.productService.removeCartItem(item);
  }
  // REMOVING ALL ITEMS FROM THE CART
  emptycart() {
    this.productService.removeAllCart();
  }

  ///Modal for Delete Confirmation

  open(content: any, item: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result === 'yes') {
            this.removeItem(item);
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
