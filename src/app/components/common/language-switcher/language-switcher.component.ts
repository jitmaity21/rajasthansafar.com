import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';


@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent {

  constructor(
    public authService: AuthorizationService
  ) { }

  switchHindi(input: boolean) {
    this.authService.isHindi = input;
  }

}
