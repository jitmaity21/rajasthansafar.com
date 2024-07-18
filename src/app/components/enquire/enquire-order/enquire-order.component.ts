import {Component, Input, OnInit} from '@angular/core';
import {NavService} from '../../../services/nav.service';
import {capitalizeFirstLetter, getOrderStatusColor} from '../../../utils';

@Component({
  selector: 'app-enquire-order',
  templateUrl: './enquire-order.component.html',
  styleUrls: ['./enquire-order.component.scss']
})
export class EnquireOrderComponent implements OnInit {

  @Input() id: number;
  @Input() orderId: number;
  @Input() orderStatus: string;
  @Input() name: string;
  @Input() quantity: number;
  @Input() price: number;
  @Input() currencySymbol: string;
  getStatusColor = getOrderStatusColor;
  capFirstLetter = capitalizeFirstLetter;

  constructor(private navService: NavService) {
  }

  ngOnInit(): void {
  }

  onClicked() {
    this.navService.navigateToPage(`explore/product/${this.id}`);
  }
}
