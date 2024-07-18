import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent {
  banner: { image: string, title: string };
  intro: { title: { english: string, hindi: string }, content: { english: string, hindi: string } };
  tours: { id: number, title: { english: string, hindi: string }, location: { english: string, hindi: string }, intro: { english: string, hindi: string }, image: string }[];

  constructor(
    public authService: AuthorizationService
  ) {
    this.getTours();
    this.banner = { image: '../../../../assets/components/common/banner_image.jpg', title: '' };
    this.intro = {
      title: { english: 'OFFERINGS', hindi: 'प्रस्ताव' },
      content: {
        english:
          'We offer cultural tourism for experiencing local culture, cuisine, art and craft in their myriad forms and expressions.enjoying music and dance and engaging With the artists in the very region where they belong. You can also shop directly from the makers.It is easy to reach the villages which are accessible by road and',
        hindi: 'हम स्थानीय संस्कृति, भोजन, कला और शिल्प को उनके असंख्य रूपों में अनुभव करने के लिए सांस्कृतिक पर्यटन प्रदान करते हैं भाव। संगीत और नृत्य का आनंद लें और कलाकारों के साथ उसी क्षेत्र में रहें जहां वे हैं। आप निर्माताओं से सीधे खरीदारी भी कर सकते हैं। उन गाँवों तक पहुँचना आसान है जो सड़क मार्ग द्वारा सुलभ हैं और'
      }
    }
  }

  getTours() {
    this.authService.getReq('tours?per_page=100').subscribe((data: any[]) => {
      this.tours = data.map((tour: any) => {
        return {
          id: tour.id,
          title: {
            english: tour.acf.name.english,
            hindi: tour.acf.name.hindi
          },
          location: {
            english: tour.acf.location.english,
            hindi: tour.acf.location.hindi
          },
          intro: {
            english: this.authService.trimWords(tour.acf.carousel_intro.english, 30),
            hindi: this.authService.trimWords(tour.acf.carousel_intro.hindi, 30)
          },
          image: tour.acf.caoursel_image
        }
      });
    });
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
