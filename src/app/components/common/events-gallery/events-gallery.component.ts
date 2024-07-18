import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-events-gallery',
  templateUrl: './events-gallery.component.html',
  styleUrls: ['./events-gallery.component.scss']
})
export class EventsGalleryComponent implements OnInit {

  @Input() events: { date: string, image: string, id: string }[];
  @ViewChild('attractionModal') attractionModal: ModalDirective;
  eventDetails: { name: string, description: string, date: string, venue: string, images: string[] }

  constructor(
    private _authService: AuthorizationService
  ) {
    this.events = [{
      date: 'November 3-5, 2020',
      image: '../../../../assets/components/common/event01.png',
      id: null
    }]
  }

  ngOnInit(): void {
  }

  triggerModal(input: string) {
    this.attractionModal.show();
    this._authService.getReq('events/' + input).subscribe((event: any) => {
      this.eventDetails = {
        name: event.acf.name,
        description: event.acf.description,
        date: event.acf.date,
        venue: event.acf.venue,
        images: [event.acf.cover_picture]
      };
      if (event.acf.images) {
        event.acf.images.forEach(element => {
          this.eventDetails.images.push(element.image)
        });
      }
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
