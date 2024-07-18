import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import {NavService} from 'src/app/services/nav.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from 'src/app/services/authorization.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  loading = false;
  message: string;
  productForm: FormGroup;
  imageData: File = undefined;
  galleryData: File[] = [];

  artists: [{ id: number, name: string }];
  crafts: any[];
  categories: any[];
  productCategories: any[] = [];

  constructor(public userService: UserService, private navService: NavService, public authService: AuthorizationService) {
    this.productForm = new FormGroup({
      productName: new FormControl('', [Validators.minLength(3), Validators.required]),
      productDescriptionEnglish: new FormControl('', Validators.required),
      productDescriptionHindi: new FormControl('', Validators.required),
      productArtist: new FormControl('', Validators.required),
      productCraft: new FormControl('', Validators.required),
      productWhatsNew: new FormControl(''),
      productShortDescription: new FormControl(''),
      regularPrice: new FormControl('', [Validators.pattern('[0-9]+(\.[0-9]?)?'), Validators.required]),
      dimenLength: new FormControl('', Validators.pattern('[0-9]+')),
      dimenHeight: new FormControl('', Validators.pattern('[0-9]+')),
      dimenWidth: new FormControl('', Validators.pattern('[0-9]+')),
      weight: new FormControl('', Validators.pattern('[0-9]+')),
      salePrice: new FormControl('', Validators.pattern('[0-9]+(\.[0-9]?)?'))
    });
  }

  ngOnInit(): void {
    if (!this.userService.userIsArtist) {
      this.navService.navigateToPage('');
      return;
    }

    this.navService.getJson('artists')
      .then((newArtists: any) => {
        this.artists = newArtists.map((artist) => {
          return {
            id: artist.id,
            name: artist.acf.name
          };
        });
      });

    this.authService.getReq('arts_crafts').subscribe((newCrafts: any[]) => {
      this.crafts = newCrafts.map((craft) => {
        return {
          id: craft.id,
          name: craft.acf.name
        };
      }).filter((craft) => craft);
    });

    this.navService.getWCJson(`products/categories?per_page=100`)
      .then((res: any[]) => {
        this.categories = res
          .filter(category => category.parent)
          .map((category) => {
            return {
              id: category.id,
              name: category.name,
              slug: category.slug
            };
          });
      });

  }

  onSubmit() {
    this.loading = true;
    this.userService.addProduct(
      this.productName.value,
      this.productDescriptionEnglish.value,
      this.productDescriptionHindi.value,
      this.productArtist.value,
      this.productCraft.value,
      this.productWhatsNew.value,
      this.productShortDescription.value,
      this.regularPrice.value,
      this.salePrice.value,
      this.productCategories,
      this.imageData,
      this.galleryData,
      this.dimenLength.value,
      this.dimenHeight.value,
      this.dimenWidth.value,
      this.weight.value)
      .then((res: any) => {
        this.userService.showToastMessage(`${this.productName.value} added`);
        this.navService.navigateToPage('products');
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
        console.log(err);
      });
  }

  get productName() {
    return this.productForm.get('productName');
  }

  get productDescriptionEnglish() {
    return this.productForm.get('productDescriptionEnglish');
  }

  get productDescriptionHindi() {
    return this.productForm.get('productDescriptionHindi');
  }

  get productArtist() {
    return this.productForm.get('productArtist');
  }

  get productCraft() {
    return this.productForm.get('productCraft');
  }

  get productWhatsNew() {
    return this.productForm.get('productWhatsNew');
  }

  get productShortDescription() {
    return this.productForm.get('productShortDescription');
  }

  get regularPrice() {
    return this.productForm.get('regularPrice');
  }

  get dimenLength() {
    return this.productForm.get('dimenLength');
  }

  get dimenHeight() {
    return this.productForm.get('dimenHeight');
  }

  get dimenWidth() {
    return this.productForm.get('dimenWidth');
  }

  get weight() {
    return this.productForm.get('weight');
  }

  get salePrice() {
    return this.productForm.get('salePrice');
  }

  fileRead(e: FileList, value: boolean) {
    let temp: File = e.item(0);
    if (value) {
      if (
        temp &&
        temp.type.split('/')[1] !== 'jpg' &&
        temp.type.split('/')[1] !== 'jpeg' &&
        temp.type.split('/')[1] !== 'png') {
        this.userService.showToastMessage('Sorry, only image .jpg, .jpeg and .png extension is allowed');
        this.imageData = null;
      } else {
        this.imageData = temp;
      }
    } else {
      if (e.length > 5) {
        this.userService.showToastMessage('Max 5 images allowed');
        return;
      }
      for (let i = 0; i < e.length; i++) {
        temp = e.item(i);
        if (this.galleryData.length === 5) {
          this.userService.showToastMessage('Max 5 images allowed');
          return;
        }
        if (
          temp &&
          temp.type.split('/')[1] !== 'jpg' &&
          temp.type.split('/')[1] !== 'jpeg' &&
          temp.type.split('/')[1] !== 'png'
        ) {
          this.userService.showToastMessage('Sorry, only image .jpg, .jpeg and .png extension is allowed');
          this.galleryData = [];
        } else {
          this.galleryData = [...this.galleryData, temp];
        }
      }
    }
  }

  onCategoriesChange(e, category) {
    if (e.target.checked) {
      this.productCategories.push(category);
    } else {
      this.productCategories = this.productCategories.filter(item => {
        return item.id !== category.id;
      });
    }
  }

}
