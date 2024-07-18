import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-art-attraction-slick-carousel',
  templateUrl: './art-attraction-slick-carousel.component.html',
  styleUrls: ['./art-attraction-slick-carousel.component.scss']
})
export class ArtAttractionSlickCarouselComponent implements OnInit {

  @Input() slides: { name: string, name_hindi: string , image: string, attractionId: string, craftId: string }[];
  @ViewChild('attractionModal') attractionModal: ModalDirective;
  attractionDetails: { name: string, name_hindi: string , description: string, description_hindi: string , image: string, location: string };

  constructor(
    public _authService: AuthorizationService
  ) {
    this.slides = [{
      name: 'November 3-5, 2020',
      name_hindi: 'November 3-5, 2020',
      image: '../../../../assets/components/common/event01.png', attractionId: null, craftId: null
    }, {
      name: 'November 3-5, 2020',
      name_hindi: 'November 3-5, 2020',
      image: '../../../../assets/components/common/banner_image.jpg', attractionId: null, craftId: null
    }, {
      name: 'November 3-5, 2020',
      name_hindi: 'November 3-5, 2020',
      image: '../../../../assets/components/common/banner_image.jpg', attractionId: null, craftId: null
    }, {
      name: 'November 3-5, 2020',
      name_hindi: 'November 3-5, 2020',
      image: '../../../../assets/components/common/banner_image.jpg', attractionId: null, craftId: null
    }];
  }

  ngOnInit(): void {
  }

  clickEvent(craftId: string, attractionId: string) {
    this.attractionDetails = null;
    if (craftId) {
      this._authService.navigateToPage('art&craft/' + craftId);
    } else if (this.attractionModal) {
      this._authService.getReq('attractions/' + attractionId).subscribe((attraction: any) => {
        this.attractionDetails =
        {
          name: attraction.acf.name,
          name_hindi: attraction.acf.name_hindi ? attraction.acf.name_hindi : attraction.acf.name,
          description: attraction.acf.description,
          description_hindi: attraction.acf.description_hindi ? attraction.acf.description_hindi : attraction.acf.description,
          image: attraction.acf.cover_picture,
          location: attraction.acf.location
        }
      });
      this.attractionModal.show();
    }
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
