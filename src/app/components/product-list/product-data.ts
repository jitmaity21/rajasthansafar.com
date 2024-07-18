import {NavService} from '../../services/nav.service';

export class ProductData {
  constructor(private navService: NavService) {
  }

  // TODO: Deal with pagination
  getProduct(id: number): Promise<Product[] | null> {
    return this.navService.getWCJson(`products?category=${id}&per_page=100`)
      .then((res: any[]) => {
        if (!res || !res.length) {
          return null;
        }

        return res.map(item => {
          return {
            id: item.id,
            name: item.name,
            price: `Rs. ${Number(item.price).toLocaleString()}`,
            image: item.images[0]?.src || 'http://cms.rajasthansafar.com/wp-content/uploads/woocommerce-placeholder.png'
          };
        });
      });
  }
}

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}
