import {Component, OnInit} from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';
import {NavService} from '../../../services/nav.service';
import {CartData, Product} from './cart-data';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {

  isCart: boolean;
  list: Product[] = [];
  isFetching = true;
  private dataRepo: CartData;

  constructor(public modalRef: MDBModalRef, public navService: NavService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.dataRepo = new CartData(this.navService);
    this.userService.refreshCartWish(false)
      .then(() => this.fetchData());
  }

  fetchData() {
    const list = this.isCart ? this.userService.cartIds : this.userService.wishIds;
    this.dataRepo.getProductsList(list)
      .then(res => {
        let someFailed: boolean;
        res.forEach(result => {
          if (result.status === 'fulfilled') {
            this.list.push(result.value);
          } else {
            someFailed = true;
          }
        });
        if (someFailed) {
          // Not failing outright, because the server does not validate products. It is possible to push non-existent products to the server
          // Not failing here means that that won't be a big problem.
          this.userService.showToastMessage('Failed to fetch some items. List may be incomplete.');
        }
        this.isFetching = false;
      });
  }

  removeProduct(product: Product, index: number) {
    this.isFetching = true;
    if (this.isCart) {
      this.userService.removeFromCart(product.id)
        .then(res => {
          this.isFetching = false;
          if (!res.isCart) {
            this.removeProductFromList(product, index, true);
          } else {
            this.userService.showToastMessage('Failed to remove product');
          }
        })
        .catch(() => {
          this.isFetching = false;
          this.userService.showToastMessage('Failed to remove product');
        });
    } else {
      this.userService.removeFromWish(product.id)
        .then(res => {
          this.isFetching = false;
          if (!res.isWish) {
            this.removeProductFromList(product, index, false);
          } else {
            this.userService.showToastMessage('Failed to remove product');
          }
        })
        .catch(() => {
          this.isFetching = false;
          this.userService.showToastMessage('Failed to remove product');
        });
    }
  }

  private removeProductFromList(product: Product, index: number, isCart: boolean, wasAdd?: boolean) {
    this.list.splice(index, 1);
    this.userService
      .showToastMessage(`${product.name} ${wasAdd ? 'added to' : 'removed from'} ${isCart ? 'cart' : 'liked list'}`);
  }

  addToCart(product: Product, index: number) {
    this.isFetching = true;
    this.userService.addToCart(product.id)
      .then(status => {
        this.isFetching = false;
        if (status.isCart) {
          this.removeProductFromList(product, index, true, true);
        }
      })
      .catch(() => {
        this.isFetching = false;
        this.userService.showToastMessage('Failed to add product');
      });
  }

  enquiry() {
    this.modalRef.hide();
    this.navService.navigateToPage('enquire');
  }

  onProductClick(id: number) {
    this.navService.navigateToPage(`explore/product/${id}`);
    this.modalRef.hide();
  }
}
