import {Component} from '@angular/core';
import {AuthorizationService} from 'src/app/services/authorization.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {

  isYoutube: boolean;

  constructor(
    private authService: AuthorizationService
  ) {
    this.isYoutube = false;
  }
}
