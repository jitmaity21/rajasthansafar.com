import {NavService} from '../../../services/nav.service';

export class CartData {

  constructor(private navService: NavService) {
  }

  private getProduct(id: number): Promise<Product> {
    return this.navService.getWCJson(`products/${id}`)
      .then((res: any) => {
        return {
          id: res.id,
          sku: res.sku,
          imageUrl: res.images[0]?.src || 'http://cms.rajasthansafar.com/wp-content/uploads/woocommerce-placeholder.png',
          name: res.name,
          price: 'Rs. ' + Number(res.price).toLocaleString()
        };
      });
  }

  getProductsList(cartWishIds: number[]): Promise<PromiseSettledResult<Product>[]> {
    const promises = cartWishIds.map(itemId => {
      return this.getProduct(itemId);
    });
    return Promise.allSettled(promises);
  }
}

export interface Product {
  id: number;
  sku: string;
  imageUrl: string;
  name: string;
  price: string;
}
