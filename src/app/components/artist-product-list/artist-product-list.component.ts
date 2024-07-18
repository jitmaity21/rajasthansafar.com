import { Component, OnInit } from '@angular/core';
import { UserService, Product } from 'src/app/services/user.service';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-artist-product-list',
  templateUrl: './artist-product-list.component.html',
  styleUrls: ['./artist-product-list.component.scss']
})
export class ArtistProductListComponent implements OnInit {
  products: Product[];
  page = 1;

  constructor(public userService: UserService,private navService: NavService) { }

  ngOnInit(): void {
    if (!this.userService.userIsArtist) {
      this.navService.navigateToPage('');
      return;
    }

    this.fetchProducts();
  }

  private fetchProducts() {
    this.userService.getProducts()
      .then(res => this.products = res)
      .catch(err => {
        if (err.status !== 404 && err.status !== 401) {
          throw err;
        }
      })
      .catch(() => this.userService.showToastMessage('Failed to retrieve your products. Please try again.'));
  }

}
