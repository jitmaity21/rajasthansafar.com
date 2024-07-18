import {Component, OnInit} from '@angular/core';
import {NavService} from '../../services/nav.service';
import {Product, ProductData} from './product-data';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  productRepo: ProductData;
  categoryName?: string;
  page = 1;

  constructor(private navService: NavService, private route: ActivatedRoute, private router: Router) {
    this.productRepo = new ProductData(this.navService);

    // Issue: Name will be undefined on page refresh
    this.categoryName = this.router.getCurrentNavigation().extras.state?.name;
  }

  ngOnInit(): void {
    this.route.params.subscribe(path => {
      if (path.catId) {
        this.productRepo.getProduct(parseInt(path.catId, 10))
          .then(res => this.products = res);
      }
    });
  }

}
