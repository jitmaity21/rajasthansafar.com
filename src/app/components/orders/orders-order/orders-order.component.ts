import {Component, Input, OnInit} from '@angular/core';
import {NavService} from '../../../services/nav.service';

@Component({
  selector: 'app-order-order',
  templateUrl: './orders-order.component.html',
  styleUrls: ['./orders-order.component.scss']
})
export class OrdersOrderComponent implements OnInit {

  @Input() id: number;
  @Input() name: string;
  @Input() quantity: number;
  @Input() price: number;
  @Input() currencySymbol: string;

  constructor(private navService: NavService) {
  }

  ngOnInit(): void {
  }

  onClicked() {
    this.navService.navigateToPage(`explore/product/${this.id}`);
  }
}
