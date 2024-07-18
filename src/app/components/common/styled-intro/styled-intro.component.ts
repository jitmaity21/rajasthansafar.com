import { Component, Input } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-styled-intro',
  templateUrl: './styled-intro.component.html',
  styleUrls: ['./styled-intro.component.scss']
})
export class StyledIntroComponent {

  @Input() content: { title: any, titleHindi: string, subTitle: any, subTitleHindi: string, content: any, contentHindi: string };

  constructor(
    public authService: AuthorizationService
  ) {
  }

}
