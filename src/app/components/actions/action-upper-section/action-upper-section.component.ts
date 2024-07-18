import { Component, Input } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-action-upper-section',
  templateUrl: './action-upper-section.component.html',
  styleUrls: ['./action-upper-section.component.scss']
})
export class ActionUpperSectionComponent {

  @Input() intro: { title: string, titleHindi: string, content: string, contentHindi: string };
  @Input() stats: { name: string, nameHindi: string, figure: string, image: string }[]

  constructor(
    public authService: AuthorizationService
  ) { }

}
