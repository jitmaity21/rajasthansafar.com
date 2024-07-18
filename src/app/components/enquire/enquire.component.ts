import {Component, OnDestroy, OnInit} from '@angular/core';
import {SingleOrder, UserService} from '../../services/user.service';
import {CartData, Product} from '../common/cart-modal/cart-data';
import {NavService} from '../../services/nav.service';

@Component({
  selector: 'app-enquire',
  templateUrl: './enquire.component.html',
  styleUrls: ['./enquire.component.scss']
})
export class EnquireComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  orders: SingleOrder[] = [];
  currency = '';
  loading = true;
  disableButton = false;
  phoneNumber: string;

  constructor(public userService: UserService, private navService: NavService) {
  }

  ngOnInit(): void {
    this.userService.setEnquiryCallback(cart => this.fetchData(cart));
  }

  ngOnDestroy(): void {
    this.userService.removeEnquiryCallback();
  }

  private fetchData(cartIds: number[]) {
    this.fetchOrders();
    if (cartIds) {
      new CartData(this.navService).getProductsList(cartIds)
        .then(res => {
          this.products = [];
          this.loading = false;
          let someFailed: boolean;
          res.forEach(result => {
            if (result.status === 'fulfilled') {
              this.products.push(result.value);
            } else {
              someFailed = true;
            }
          });
          if (someFailed) {
            // Not failing outright, because the server does not validate products. It is possible to push non-existent
            // products to the server. Not failing here means that that won't be a big problem.
            this.userService.showToastMessage('Failed to fetch some items. List may be incomplete.');
          }
        });
    } else {
      this.loading = false;
    }
  }

  private fetchOrders() {
    this.userService.getOrders()
      .then(orders => {
        this.currency = orders.currencySymbol;
        this.orders = this.sortOrders(orders.orders);
      })
      .catch(err => {
        if (err.status !== 404 && err.status !== 401) {
          throw err;
        }
      })
      .catch(() => this.userService.showToastMessage('Failed to retrieve your orders. Please try again.'));
  }

  private sortOrders(orders: SingleOrder[]): SingleOrder[] {
    return orders.sort((a, b) => {
      // Abusing the fact that statuses can be one of 3 strings.
      return b.status.localeCompare(a.status);
    });
  }

  onEnquire() {
    if (this.userService.userPhone) {
      this.phoneNumber = this.userService.userPhone;
    }

    // Form input validation? Meh.
    if (this.phoneNumber && this.phoneNumber.length === 10) {
      this.disableButton = true;
      this.navService.sendEnquiryMail(this.userService.userDisplayName, this.userService.userEmail, this.phoneNumber, this.products)
        .then(() => this.userService.placeOrders())
        .then(someFailed => {
          if (someFailed) {
            this.userService.showToastMessage('Failed to place some of your orders. Please try again.');
          } else {
            this.userService.showToastMessage('Your enquiry has been submitted. We will get back to you soon.');
          }
        })
        .catch(() => this.userService.showToastMessage('Failed to submit. Please try again.'))
        .finally(() => this.disableButton = false);
    } else {
      this.userService.showToastMessage('Please enter your phone number');
    }
  }

}
