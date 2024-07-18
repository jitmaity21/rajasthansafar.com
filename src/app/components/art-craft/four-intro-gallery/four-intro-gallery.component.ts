import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-four-intro-gallery',
  templateUrl: './four-intro-gallery.component.html',
  styleUrls: ['./four-intro-gallery.component.scss']
})
export class FourIntroGalleryComponent {

  @Input() gallery: any;
  video: SafeResourceUrl;

  constructor(
    public _authService: AuthorizationService
  ) {
  }

}
