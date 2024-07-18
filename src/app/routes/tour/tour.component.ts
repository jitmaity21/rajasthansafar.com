import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from 'src/app/services/authorization.service';
import {ActivatedRoute} from '@angular/router';
import {SafeResourceUrl} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {

  tour: Tour;
  tourIdx: number;
  // TODO: Redundant, as Tours component already fetches this.
  tours: Tour[];
  validatingForm: FormGroup;
  formSubmitted: boolean;

  carouselConfig = {
    slidesToShow: 3,
    infinite: false,
    responsive: [{
      breakpoint: 1024,
      settings: {slidesToShow: 2}
    }, {
      breakpoint: 600,
      settings: {slidesToShow: 1}
    }]
  };

  constructor(public authService: AuthorizationService, route: ActivatedRoute) {
    this.setIdFromParam(route);
    this.validatingForm = new FormGroup({
      contactFormName: new FormControl('', Validators.required),
      contactFormEmail: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      contactFormPhone: new FormControl('', Validators.required),
      contactFormMessage: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    window.scrollTo({top: 0});
  }

  setIdFromParam(route: ActivatedRoute) {
    route.params.subscribe((data) => {
        if (data.tourId) {
          this.setTour(parseInt(data.tourId, 10));
        }
      }
    );
  }

  setTour(tourId: number): void {
    this.authService.getReq(`tours`).subscribe((items: any[]) => {
      this.tours = items.map(data => {
        const tour = {
          id: data.id,
          ...data.acf
        };
        tour.videos = data.acf.videos && data.acf.videos.map(video => {
          return {
            title: video.title,
            video: this.authService.sanatizeUrl(video.video)
          };
        });
        return tour;
      });

      this.tourIdx = this.tours.findIndex(tour => tour.id === tourId);
      this.tour = this.tours[this.tourIdx];
      this.formSubmitted = false;
      this.validatingForm.reset();
    });
  }

  changeTour(isNext: boolean): void {
    if (isNext) {
      if (this.tourIdx < this.tours.length - 1) {
        this.tour = this.tours[++this.tourIdx];
        this.formSubmitted = false;
        this.validatingForm.reset();
      }
    } else if (this.tourIdx > 0) {
      this.tour = this.tours[--this.tourIdx];
      this.formSubmitted = false;
      this.validatingForm.reset();
    }
  }

  trackBy() {
  }

  get contactFormName() {
    return this.validatingForm.get('contactFormName');
  }

  get contactFormEmail() {
    return this.validatingForm.get('contactFormEmail');
  }

  get contactFormPhone() {
    return this.validatingForm.get('contactFormPhone');
  }

  get contactFormMessage() {
    return this.validatingForm.get('contactFormMessage');
  }

  sendMail() {
    if (this.validatingForm.status === 'VALID') {
      const body = {
        email: 'info@rajasthansafar.com',
        emailTitle: 'Enquiry from Rajasthan Safar about Tours',
        emailBody: `<h3>${this.validatingForm.value.contactFormName} made an enquiry about a tour</h3>`
          + `<p>Name: ${this.validatingForm.value.contactFormName}</p>`
          + `<p>Email: ${this.validatingForm.value.contactFormEmail}</p>`
          + `<p>Phone: ${this.validatingForm.value.contactFormPhone}</p>`
          + `<p>Tour Name: ${this.tour.name.english}</p>`
          + `<p>Message: ${this.validatingForm.value.contactFormMessage}</p>`
      };
      this.validatingForm.reset();
      this.formSubmitted = true;
      this.authService.sendMail(body).subscribe(() => {
      });
    }
  }

}

interface Tour {
  id: number;
  name: {
    english: string;
    hindi: string;
  };
  location: {
    english: string;
    hindi: string;
  };
  caoursel_image: string;
  carousel_intro: {
    english: string;
    hindi: string;
  };
  banner_image: any;
  description: {
    english: string;
    hindi: string;
  };
  itenaries: {
    title: {
      english: string;
      hindi: string;
    };
    description: {
      english: string;
      hindi: string;
    };
    image: string;
  }[];
  videos: {
    title: {
      english: string;
      hindi: string;
    };
    video: SafeResourceUrl;
  }[];
  gallery: {
    left_image: any;
    center_top_image: any;
    center_bottom_image: any;
    right_image: any;
    gallery_images: boolean;
  };
}
