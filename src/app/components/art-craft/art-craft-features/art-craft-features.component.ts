import { Component, OnInit, Input } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-art-craft-features',
  templateUrl: './art-craft-features.component.html',
  styleUrls: ['./art-craft-features.component.scss']
})
export class ArtCraftFeaturesComponent {

  @Input() features: { image: string, name: string, content: string, nameHindi: string, contentHindi: string }[];

  constructor(
    public authService: AuthorizationService
  ) {
    this.features = [{
      image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg', name: 'Feature 1', content: 'Some content', nameHindi: null, contentHindi: null
    }, {
      image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg', name: 'Feature 1', content: 'Some content', nameHindi: null, contentHindi: null
    }, {
      image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg', name: 'Feature 1', content: 'Some content', nameHindi: null, contentHindi: null
    }, {
      image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg', name: 'Feature 1', content: 'Some content', nameHindi: null, contentHindi: null
    }]

  }

}
