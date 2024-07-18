import {NavService} from '../../services/nav.service';

export class ExploreData {
  constructor(private navService: NavService) {
  }

  // TODO: Handle pagination. Just using 100 items per page now, because there should be very few categories.
  getCategories(): Promise<{ categories: CategoryParent, craftsId: number, uncategorizedId: number }> {
    return this.navService.getWCJson(`products/categories?per_page=100`)
      .then((res: any[]) => {
        const categoryParent: CategoryParent = {};
        let craftsId = -1;
        let uncategorizedId = -1;

        res.forEach(item => {
          if (item.parent) {
            // This is a child category
            const cat = {
              id: item.id,
              name: item.name,
              description: item.description || null,
              imageUrl: item.image?.src || 'http://cms.rajasthansafar.com/wp-content/uploads/woocommerce-placeholder.png'
            };
            if (!categoryParent[item.parent]) {
              categoryParent[item.parent] = {children: [cat]};
            } else {
              categoryParent[item.parent].children.push(cat);
            }

          } else {
            if (!categoryParent[item.id]) {
              categoryParent[item.id] = {name: item.name, children: []};
            } else {
              categoryParent[item.id].name = item.name;
            }

            if (item.name === 'Crafts') {
              craftsId = item.id;
            } else if (item.name === 'Uncategorized') {
              uncategorizedId = item.id;
            }
          }
        });

        return {categories: categoryParent, craftsId, uncategorizedId};
      });
  }
}

export interface CategoryParent {
  [id: number]: {
    name?: string;
    children: CategoryChild[];
  };
}

export interface CategoryChild {
  id: number;
  name: string;
  description?: string;
  imageUrl: string;
}
