import { Component, OnInit, Input } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-card-overlay-carousel',
  templateUrl: './card-overlay-carousel.component.html',
  styleUrls: ['./card-overlay-carousel.component.scss']
})
export class CardOverlayCarouselComponent implements OnInit {

  @Input() slides: { name: string, nameHindi: string, subHeading: string, subHeadingHindi: string, content: string, contentHindi: string, image: string, link: string }[];

  constructor(
    public authService: AuthorizationService
  ) { }

  ngOnInit(): void {
  }

}
