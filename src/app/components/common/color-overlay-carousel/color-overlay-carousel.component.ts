import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-color-overlay-carousel',
  templateUrl: './color-overlay-carousel.component.html',
  styleUrls: ['./color-overlay-carousel.component.scss']
})
export class ColorOverlayCarouselComponent implements OnChanges {

  @Input() slides: { name: string, nameHindi: string, subHeading: string, subHeadingHindi: string, content: string, contentHindi: string, image: string, link: string }[];

  constructor(
    public authService: AuthorizationService
  ) {
  }

  ngOnChanges() {
    this.slides = this.slides.filter(slide => slide.image)
  }

}
