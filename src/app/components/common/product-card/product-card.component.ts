import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CWStatus, UserService} from 'src/app/services/user.service';
import {NavService} from 'src/app/services/nav.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() id?: number;
  @Input() src: string;
  @Input() title: string;
  @Input() desc?: string;
  @Input() type?: string;
  @Output() prodClick = new EventEmitter();

  constructor(public userService: UserService, private navService: NavService) {
  }

  ngOnInit(): void {
  }

  isInCart(): boolean {
    return this.userService.cartIds && this.userService.cartIds.findIndex(item => item === this.id) >= 0;
  }

  isInWish(): boolean {
    return this.userService.wishIds && this.userService.wishIds.findIndex(item => item === this.id) >= 0;
  }

  onCartClick(event: MouseEvent) {
    this.animateButton(event);
    const wasCart = this.isInCart();
    const wasWish = this.isInWish();
    if (this.isInCart()) {
      this.userService.removeFromCart(this.id)
        .then(status => this.setStatus(wasCart, wasWish, status, true))
        .catch(() => this.showError());
    } else {
      this.userService.addToCart(this.id)
        .then(status => this.setStatus(wasCart, wasWish, status, true))
        .catch(() => this.showError());
    }
  }

  onWishClick(event) {
    this.animateButton(event);
    const wasCart = this.isInCart();
    const wasWish = this.isInWish();
    if (this.isInWish()) {
      this.userService.removeFromWish(this.id)
        .then(status => this.setStatus(wasCart, wasWish, status, false))
        .catch(() => this.showError());
    } else {
      this.userService.addToWish(this.id)
        .then(status => this.setStatus(wasCart, wasWish, status, false))
        .catch(() => this.showError());
    }
  }

  private showError() {
    this.userService.showToastMessage('Failed to modify cart. Please try again.');
  }

  onProdClick() {
    this.prodClick.emit();
    this.navService.navigateToPage(`explore/product/${this.id}`);
  }

  private setStatus(wasInCart: boolean, wasInWish: boolean, stat: CWStatus, cartChanged: boolean) {
    // Using cartChanged instead of setting message directly because we won't know if updating lists on the server failed if we do that.
    this.showMessage(wasInCart, wasInWish, stat, cartChanged);
  }

  animateButton(event: MouseEvent) {
    const element = (event.target as Element).closest('button');
    element.classList.toggle('animate');

    // Needed to trigger reflow. Removing either line will break the animation.
    const temp = element.offsetWidth;

    element.classList.add('animate');
  }

  showMessage(wasInCart: boolean, wasInWish: boolean, newStatus: CWStatus, cartChanged: boolean) {
    let message;
    if (cartChanged) {
      if (newStatus.isCart && !wasInCart) {
        message = `${this.title} added to cart.`;
      } else if (!newStatus.isCart && wasInCart) {
        message = `${this.title} removed from cart.`;
      }
    } else {
      if (newStatus.isWish && !wasInWish) {
        message = `${this.title} added to wishlist.`;
      } else if (!newStatus.isWish && wasInWish) {
        message = `${this.title} removed from wishlist.`;
      }
    }
    this.userService.showToastMessage(message);
  }
}
