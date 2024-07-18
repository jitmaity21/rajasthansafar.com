import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-art-craft-product-gallery',
  templateUrl: './art-craft-product-gallery.component.html',
  styleUrls: ['./art-craft-product-gallery.component.scss']
})
export class ArtCraftProductGalleryComponent implements OnInit {

  @Input() products: { name: string, image: string }[];
  @Input() type: string;

  constructor() {
    this.products = [{
      name: 'Product 1',
      image: '../../../../assets/components/common/event01.png'
    }, {
      name: 'Product 2',
      image: '../../../../assets/components/common/banner_image.jpg'
    }, {
      name: 'Product 3',
      image: '../../../../assets/components/common/banner_image.jpg'
    }, {
      name: 'Product 4',
      image: '../../../../assets/components/common/banner_image.jpg'
    },]
  }

  ngOnInit(): void {
  }

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    // "nextArrow": "<div class='nav-btn next-slide'><img src='../../../../assets/components/utilities/nav-icon.png' style='width: 60px; position: absolute; top: 48%; right: -41px; cursor: pointer'></div>",
    // "prevArrow": "<div class='nav-btn prev-slide'><img src='../../../../assets/components/utilities/nav-icon.png' style='width: 60px; position: absolute; top: 48%; left: -41px; cursor: pointer; transform: rotate(180deg);'></div>",
    "dots": false,
    "infinite": false,
    "autoplay": false,
    "autoplaySpeed": 2000,
    responsive: [
      {
        breakpoint: 1920,
        settings: { slidesToShow: 3, slidesToScroll: 1 }
      }, {
        breakpoint: 1024, settings: {
          slidesToShow: 2, slidesToScroll: 2
        }
      }, {
        breakpoint: 600, settings: {
          slidesToShow: 1, slidesToScroll: 1
        }
      }, {
        breakpoint: 480, settings: {
          slidesToShow: 1, slidesToScroll: 1
        }
      }
    ]
  };
  slickInit(e) {
  }
  breakpoint(e) {
  }
  afterChange(e) {
  }
  beforeChange(e) {
  }

}
