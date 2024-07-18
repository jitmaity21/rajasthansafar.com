import {Languages, NavService} from '../../services/nav.service';
import {getLangNewlines} from '../../utils';

export class ProductData {
  constructor(private navService: NavService) {
  }

  getProduct(id: number): Promise<Product | null> {
    return this.navService.getWCJson(`products/${id}`)
      .then((res: any) => {
        const tempProduct = {
          id: res.id,
          imageUrls: res.images.map(image => image.src),
          name: res.name,
          price: 'Rs. ' + Number(res.price).toLocaleString(),
          code: res.sku,
          categories: res.categories.map(item => item.name).join(', '),
          tags: res.tags.map(item => item.name).join(', ') || null,
          description: getLangNewlines(res.acf.description),
          dimensions: res.dimensions,
          weight: res.weight,
          artist: undefined,
          related: undefined
        };
        this.setArtistAndRelated(tempProduct, res.acf.artist, res.cross_sell_ids);
        return tempProduct;
      });
  }

  private setArtistAndRelated(product: Product, artistId: number, relatedIds: number[]) {
    // Note: product is returned before artists and relatedIds complete. We're relying on the template's variable watching here.
    this.navService.getJson(`artists/${artistId}`)
      .then((artist: any) => {
        product.artist = {
          id: artistId,
          name: {english: artist.acf.name, hindi: artist.acf.name_hindi},
          imageUrl: artist.acf.image,
          desc: {english: artist.acf.content, hindi: artist.acf.content_hindi}
        };

        relatedIds.forEach(id => {
          this.navService.getWCJson(`products/${id}`)
            .then((prod: any) => {
              const thisProduct = {
                id: prod.id,
                imageUrl: prod.images[0].src,
                name: prod.name,
                price: 'Rs. ' + Number(prod.price).toLocaleString(),
              };
              if (product.related) {
                product.related.push(thisProduct);
              } else {
                product.related = [thisProduct];
              }
            });
        });
      });
  }
}

export interface Product {
  id: number;
  imageUrls: string[];
  name: string;
  price: string;
  code: string;
  categories: string;
  tags?: string;
  description?: Languages;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
  weight?: number;
  artist?: {
    id: number;
    name: Languages;
    imageUrl: string;
    desc: Languages;
  };
  related?: ProductSimple[];
}

interface ProductSimple {
  id: number;
  imageUrl: string;
  name: string;
  price: string;
}
