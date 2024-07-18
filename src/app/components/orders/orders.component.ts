import {Component, OnInit} from '@angular/core';
import {NavService, ORDERS_URL} from '../../services/nav.service';
import {UserService} from '../../services/user.service';
import {HttpClient} from '@angular/common/http';
import {capitalizeFirstLetter, getOrderStatusColor} from '../../utils';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: ArtistOrder[];
  getStatusColor = getOrderStatusColor;
  capFirstLetter = capitalizeFirstLetter;

  constructor(private navService: NavService, public userService: UserService, private http: HttpClient) {
  }

  ngOnInit(): void {
    if (!this.userService.userIsArtist) {
      this.navService.navigateToPage('');
      return;
    }
    this.setOrdersForArtist();
  }

  private setOrdersForArtist() {
    this.http.get(`${ORDERS_URL}/ordersForArtist`, {headers: {Authorization: `Bearer ${this.userService.userToken}`}})
      .subscribe((orders: ArtistOrder[]) => this.orders = orders);
  }

  setStatus(order: ArtistOrder) {
    if (order.newStatus !== order.status) {
      order.processing = true;
      this.http.post(`${ORDERS_URL}/changeOrderStatus`, {newStatus: order.newStatus, orderId: order.id},
        {headers: {Authorization: `Bearer ${this.userService.userToken}`}, responseType: 'text'})
        .subscribe(() => {
            order.status = order.newStatus;
            order.newStatus = undefined;
            order.processing = false;
          },
          () => {
            order.newStatus = undefined;
            order.processing = false;
          });
    }
  }
}

export interface CustomerDetails {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
}

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  sku?: string;
}

export interface ArtistOrder {
  id: number;
  customerDetails: CustomerDetails;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  newStatus?: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: OrderItem[];
  currencySymbol: string;
  processing?: boolean;
}
