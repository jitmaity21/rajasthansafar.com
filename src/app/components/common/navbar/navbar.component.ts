import { Component, Output, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MDBModalService } from 'angular-bootstrap-md';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  @Output() triggerContact: EventEmitter<any> = new EventEmitter
  likeCount: number;
  cartCount: number;

  footer: any;
  constructor(
    public authService: AuthorizationService,
    public userService: UserService,
    private modalService: MDBModalService,
    public navService: NavService
  ) {
  }

  ngOnInit(): void {
    this.userService.setTopNavCallback(lists => {
      this.cartCount = lists.cartCount;
      this.likeCount = lists.wishCount;
    });
  }

  openAuthModal() {
    this.modalService.show(AuthModalComponent, {
      containerClass: 'right',
      class: 'modal-full-height modal-right'
    });
  }

  openCartModal(isCart: boolean) {
    this.modalService.show(CartModalComponent, {
      containerClass: 'right',
      class: 'modal-full-height modal-right',
      data: {isCart}
    });
  }

}
