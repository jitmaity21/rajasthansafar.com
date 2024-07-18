import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-village-snippet-carousel',
  templateUrl: './village-snippet-carousel.component.html',
  styleUrls: ['./village-snippet-carousel.component.scss']
})
export class VillageSnippetCarouselComponent {

  @Input() snippets: { image: string, title: string, content: string, titleHindi: string, contentHindi: string }[];

  constructor(
    public authService: AuthorizationService
  ) { }

}
