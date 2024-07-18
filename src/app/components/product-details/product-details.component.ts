import {Component, OnInit} from '@angular/core';
import {NavService} from '../../services/nav.service';
import {Product, ProductData} from './product-data';
import {ActivatedRoute} from '@angular/router';
import {CWStatus, UserService} from '../../services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  id: number;
  product: Product;
  selectedImage: string;
  carouselConfig = {
    slidesToShow: 3,
    infinite: false,
    responsive: [{
      breakpoint: 1024,
      settings: {slidesToShow: 2}
    }, {
      breakpoint: 600,
      settings: {slidesToShow: 1}
    }]
  };

  constructor(public navService: NavService, private route: ActivatedRoute, public userService: UserService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.prodId) {
        const id = Number(params.prodId);
        new ProductData(this.navService).getProduct(id)
          .then(res => {
            this.product = res;
            this.id = id;
            this.selectedImage = res.imageUrls[0];
          })
          .catch(() => {
            this.product = null;
          });
      }
    });
  }

  isInCart(): boolean {
    return this.userService.cartIds && this.userService.cartIds.findIndex(item => item === this.id) >= 0;
  }

  isInWish(): boolean {
    return this.userService.wishIds && this.userService.wishIds.findIndex(item => item === this.id) >= 0;
  }

  toggleCart() {
    if (this.isInCart()) {
      this.userService.removeFromCart(this.id)
        .catch(() => this.showError());
    } else {
      this.userService.addToCart(this.id)
        .then(() => {})
        .catch(() => this.showError());
    }
  }

  toggleWish() {
    if (this.isInWish()) {
      this.userService.removeFromWish(this.id)
        .then(() => {})
        .catch(() => this.showError());
    } else {
      this.userService.addToWish(this.id)
        .then(() => {})
        .catch(() => this.showError());
    }
  }

  private showError() {
    this.userService.showToastMessage('Failed to modify cart. Please try again.');
  }

  onEnquire() {
    this.userService.addToCart(this.id);
    this.navService.navigateToPage('enquire');
  }

  trackBy() {
  }
}
