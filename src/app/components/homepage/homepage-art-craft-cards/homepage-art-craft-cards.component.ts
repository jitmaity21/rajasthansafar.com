import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-homepage-art-craft-cards',
  templateUrl: './homepage-art-craft-cards.component.html',
  styleUrls: ['./homepage-art-craft-cards.component.scss']
})
export class HomepageArtCraftCardsComponent implements OnInit {

  arts: any[];

  constructor(
    public _authService: AuthorizationService
  ) {
    this.getCrafts();
  }

  ngOnInit(): void {
  }

  getCrafts() {
    this._authService.getReq('arts_crafts').subscribe((crafts: any[]) => {
      this.arts = crafts.map((craft: any) => {
        return {
          name: craft.acf.name,
          icon: craft.acf.cover_picture,
          flipImage: craft.acf.cover_picture_flip,
          link: '/art&craft/' + craft.id
        }
      }).filter((craft) => craft);
    })
  }

}
