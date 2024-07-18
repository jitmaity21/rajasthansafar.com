import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Safar-angular-Frontend';
  isCraft: boolean;

  constructor(
    private router: Router
  ) {
    this.isCraft = false;
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('art&craft')) {
          this.isCraft = true;
        } else {
          this.isCraft = false;
        };
      }
    })
  }
}
