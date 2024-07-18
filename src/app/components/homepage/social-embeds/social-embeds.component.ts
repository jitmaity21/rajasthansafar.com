import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-social-embeds',
  templateUrl: './social-embeds.component.html',
  styleUrls: ['./social-embeds.component.scss']
})
export class SocialEmbedsComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {
  }

  openLink(url: string) {
    window.open('https://play.google.com/store/apps/details?id=bnc.safartunes.app', '_blank');
  }
}
