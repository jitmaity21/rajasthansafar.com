import { Component, ViewChild } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { CustomEvent } from 'ngx-image-viewer';

@Component({
  selector: 'app-gallery-pictures',
  templateUrl: './gallery-pictures.component.html',
  styleUrls: ['./gallery-pictures.component.scss']
})
export class GalleryPicturesComponent {

  @ViewChild('basicModal') basicModal: ModalDirective;

  p: number = 1;
  categories: any = { id: 0, name: 'Home', subcategories: [] };
  selectedList: any;
  breadCrumbList: any[] = [this.categories];
  gallery: string[];
  imageIndex: number;
  imgViewerConfig: any;

  constructor(
    private authService: AuthorizationService
  ) {
    this.getCategories();
    this.imgViewerConfig = {
      btnClass: 'default', // The CSS class(es) that will apply to the buttons
      zoomFactor: 0.1, // The amount that the scale will be increased by
      containerBackgroundColor: 'transparent', // The color to use for the background. This can provided in hex, or rgb(a).
      wheelZoom: true, // If true, the mouse wheel can be used to zoom in
      allowFullscreen: true, // If true, the fullscreen button will be shown, allowing the user to entr fullscreen mode
      allowKeyboardNavigation: true, // If true, the left / right arrow keys can be used for navigation
      btnIcons: { // The icon classes that will apply to the buttons. By default, font-awesome is used.
        zoomIn: 'fa fa-plus',
        zoomOut: 'fa fa-minus',
        rotateClockwise: 'fa fa-repeat',
        rotateCounterClockwise: 'fa fa-undo',
        next: 'fa fa-arrow-right',
        prev: 'fa fa-arrow-left',
        fullscreen: 'fa fa-arrows-alt',
      },
      btnShow: {
        zoomIn: true,
        zoomOut: true,
        rotateClockwise: false,
        rotateCounterClockwise: false,
        next: true,
        prev: true
      },
      customBtns: [{ name: 'link', icon: 'fa fa-times' }]
    }
  }


  getCategories() {
    this.authService.getReq('https://cms.rajasthansafar.com/wp-json/wp/v2/gallery_taxonmies?per_page=100', true).subscribe((data: any[]) => {
      this.getChild(data, this.categories);
      this.selectedList = this.categories.subcategories;
    })
  }

  getChild(categories: any[], parent: any) {
    categories.forEach(category => {
      if (category.parent === parent.id) {
        parent.subcategories.push({ id: category.id, name: category.name, image: category.acf.image, subcategories: [] });
      }
    });
    parent.subcategories.forEach(subcategory => {
      this.getChild(categories, subcategory);
    });
  }

  handleBreadCrumb(input: any, index: number) {
    this.selectedList = input.subcategories;
    this.breadCrumbList.splice(index + 1, 3);
    if (input.subcategories.length) {
      this.gallery = [];
    }
  }

  handleCategories(input: any) {
    if (input.subcategories.length) {
      this.selectedList = input.subcategories;
      this.gallery = [];
    } else {
      this.selectedList = [];
      this.getGallery(input.id);
    }
  }

  getGallery(input: number) {
    this.gallery = [];
    this.p = 1;
    this.authService.getReq('gallery', false, 200).subscribe((data: any[]) => {
      this.gallery = data.map((image: any) => {
        if (image.acf.category) {
          if (image.acf.category.indexOf(input) !== -1) {
            return image.acf.picture;
          }
        }
      }).filter(image => image);
    });
  }

  launchModal(input: number) {
    this.imageIndex = input;
    this.basicModal.show();
  }

  handleViewerEvent(input: CustomEvent) {
    this.basicModal.hide();
  }
}
