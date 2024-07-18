import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  featuredVillages: { name: string, nameHindi: string, subHeading: string, subHeadingHindi: string, content: string, image: string, link: string }[];
  events: { date: string, image: string }[];
  banner: { image: string, caption: string };

  constructor(
    private _authService: AuthorizationService
  ) {
    this.getFeaturedVillages();
    this.getEvents();
    this.banner = { image: '../../../../assets/components/common/banner_image.jpg', caption: 'Showcasing Art, Festival and Artistes of Rajasthan' };
  }

  getFeaturedVillages() {
    this._authService.getReq('villages').subscribe((villages: any[]) => {
      this.featuredVillages = villages.map((village: any) => {
        if (village.acf.feature_on_homepage) return {
          name: village.acf.name,
          subHeading: village.acf.sub_heading,
          content: village.acf.homepage_intro,
          image: village.acf.homepage_image,
          link: '/village/' + village.id,
          nameHindi: village.acf.namehindi,
          subHeadingHindi: village.acf.subheadinghindi,
          contentHindi: village.acf.carousel_introhindi
        }
      }).filter((village) => village);
      window.scrollTo({ top: 0 });
    })
  }

  getEvents() {
    this._authService.getReq('events').subscribe((events: any[]) => {
      this.events = events.map((event: any) => {
        if (Date.now() < Date.parse(event.acf.end_date)) {
          return {
            date: event.acf.date,
            image: event.acf.cover_picture,
            id: event.id
          }
        }
      }).filter((event) => event);
    });
  }

}
