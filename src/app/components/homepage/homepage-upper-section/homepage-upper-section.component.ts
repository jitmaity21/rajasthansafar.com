import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-homepage-upper-section',
  templateUrl: './homepage-upper-section.component.html',
  styleUrls: ['./homepage-upper-section.component.scss']
})
export class HomepageUpperSectionComponent {

  constructor(
    public authService: AuthorizationService
  ) { }

}
