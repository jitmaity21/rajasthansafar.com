import { Component, Input } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-cards-slick-carousel',
  templateUrl: './cards-slick-carousel.component.html',
  styleUrls: ['./cards-slick-carousel.component.scss']
})
export class CardsSlickCarouselComponent {

  @Input() slides: { title: string, titleHindi: string, subTitle: string, subTitleHindi: string, image: string, link: string, description: string, descriptionHindi }[];

  constructor(
    public authService: AuthorizationService
  ) { }

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
