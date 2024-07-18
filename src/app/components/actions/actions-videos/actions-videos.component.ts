import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-actions-videos',
  templateUrl: './actions-videos.component.html',
  styleUrls: ['./actions-videos.component.scss']
})
export class ActionsVideosComponent {

  videos: { title: string, titleHindi: string, youtube: SafeResourceUrl }[];
  constructor(
    public authService: AuthorizationService
  ) {
    this.getVideos();
  }

  getVideos() {
    this.authService.getReq('actions_videos').subscribe((theVideos: any[]) => {
      this.videos = theVideos.map((video: any) => {
        return {
          title: video.acf.title,
          titleHindi: video.acf.title_hindi,
          youtube: this.authService.sanatizeUrl(video.acf.youtube_link)
        }
      })
    })
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
