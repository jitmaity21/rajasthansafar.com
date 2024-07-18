import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {

  banner: { image: string, caption: string, captionHindi: string };
  intro: { title: string, titleHindi: string, content: string, contentHindi: string };
  events: { date: string, image: string }[];
  stats: { name: string, nameHindi: string, figure: string, image: string }[]

  constructor(
    public authService: AuthorizationService
  ) {
    this.getEvents();
    this.getIntro();
  }

  getIntro() {
    this.authService.getReq('pages/328').subscribe((data: any) => {
      this.banner = { image: data.acf.banner_image, caption: data.acf.banner_image_caption, captionHindi: data.acf.banner_image_caption_hindi };
      this.intro = { title: data.acf.title, titleHindi: data.acf.title_hindi, content: data.acf.content, contentHindi: data.acf.content_hindi };
      this.stats = data.acf.action_statistics.map((stat) => {
        return {
          name: stat.stat_name,
          nameHindi: stat.stat_name_hindi,
          figure: stat.stat_figure,
          image: stat.stat_image
        }
      });
      window.scrollTo({ top: 0 });
    })
  }

  getEvents() {
    this.authService.getReq('events').subscribe((events: any[]) => {
      this.events = events.map((event: any) => {
        if (Date.now() < Date.parse(event.acf.end_date)) {
          return {
            date: event.acf.date,
            image: event.acf.cover_picture,
            id: event.id
          }
        }
      }).filter((event) => event);
    })
  }

}
