import {Component, Input, OnInit} from '@angular/core';
import {AuthorizationService} from '../../../services/authorization.service';
import {SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-artist-craft-vibrant-moments',
  templateUrl: './artist-craft-vibrant-moments.component.html',
  styleUrls: ['./artist-craft-vibrant-moments.component.scss']
})
export class ArtistCraftVibrantMomentsComponent implements OnInit {
  @Input() craftId: number;

  videos?: { title?: { english: string, hindi: string }, url: SafeResourceUrl }[];

  constructor(public authService: AuthorizationService) {
  }

  ngOnInit(): void {
    this.setGallery();
  }

  private setGallery() {
    this.videos = [];
    this.authService.getReq('gallery', false, 200).subscribe((data: any[]) => {
      this.videos = data.map((video: any) => {
        if (video.acf.artcraft === Number(this.craftId) && video.acf.youtube_link) {
          return {
            title: video.acf.title,
            url: this.authService.sanatizeUrl(video.acf.youtube_link)
          };
        }
      }).filter(video => video);
    });
  }
}
