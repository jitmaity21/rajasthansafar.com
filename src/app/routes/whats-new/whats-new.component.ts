import {Component} from '@angular/core';
import {AuthorizationService} from 'src/app/services/authorization.service';
import {NavService} from '../../services/nav.service';

@Component({
  selector: 'app-whats-new',
  templateUrl: './whats-new.component.html',
  styleUrls: ['./whats-new.component.scss']
})
export class WhatsNewComponent {

  banner: { image: string, title: string };
  updates: { title: { english: string, hindi: string }, subtitle: { english: string, hindi: string }, details: { english: string, hindi: string }, image: string, link: { type: string, link: string } }[];
  events: { date: string, image: string }[];
  spotlights: { title: { english: string, hindi: string }, details: { english: string, hindi: string }, media: { type: 'Image' | 'Youtube', youtube_link?: string, image?: string } }[];
  products: { id: number, title: { english: string, hindi: string }, description: { english: string, hindi: string }, image: string }[];
  carouselConfig = {
    slidesToShow: 3,
    infinite: false,
    responsive: [{
      breakpoint: 1024,
      settings: {slidesToShow: 2}
    }, {
      breakpoint: 768,
      settings: {slidesToShow: 1}
    }]
  };

  constructor(public authService: AuthorizationService, private navService: NavService) {
    this.banner = {image: '../../../../assets/components/common/banner_image.jpg', title: ' '};
    this.getUpdates();
    this.getEvents();
    this.getProducts();
    this.getSpotlights();
  }

  getUpdates() {
    this.authService.getReq('whats_new_updates').subscribe((data: any[]) => {
      this.updates = data.map((update: any) => {
        return {
          title: {
            english: update.acf.title.english,
            hindi: update.acf.title.hindi
          }, subtitle: {
            english: update.acf.subtitle.english,
            hindi: update.acf.subtitle.hindi
          }, details: {
            english: update.acf.details.english,
            hindi: update.acf.details.hindi
          }, link: {
            type: update.acf.learn_more_link.type,
            link: update.acf.learn_more_link.link
          },
          image: update.acf.image
        };
      });
    });
  }

  handleLink(input: { link: string, type: string }) {
    if (input.type) {
      if (input.type === "External") {
        window.open(input.link);
      } else if (input.type === "Internal") {
        this.authService.navigateToPage(input.link);
      }
    }
  }

  getEvents() {
    this.authService.getReq('events').subscribe((events: any[]) => {
      this.events = events.map((event: any) => {
        if (Date.now() < Date.parse(event.acf.end_date)) {
          return {
            date: event.acf.date,
            image: event.acf.cover_picture,
            id: event.id
          };
        }
      }).filter((event) => event);
    });
  }

  getSpotlights() {
    this.authService.getReq('whats_new_spotlights').subscribe((spotlights: any[]) => {
      this.spotlights = spotlights.map((item: any) => {
        const spot = {
          id: item.id,
          ...item.acf
        };
        spot.media.youtube_link = this.authService.sanatizeUrl(spot.media.youtube_link);
        return spot;
      });
    });
  }

  getProducts() {
    this.navService.getWCJson('products')
      .then((products: any[]) => {
        this.products = products.map((item: any) => {
          if (item.acf.feature_in_whats_new) {
            return {
              id: item.id,
              title: {
                english: item.name,
                hindi: item.name
              },
              description: item.acf.description,
              image: item.images && item.images[0]?.src
            };
          }
          return;
        })
          .filter(item => item);
      })
      .catch(console.error);
  }

  trackBy() {
  }
}
