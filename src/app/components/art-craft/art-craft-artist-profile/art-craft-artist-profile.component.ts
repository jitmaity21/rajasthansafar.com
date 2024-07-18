import { Component, Input } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-art-craft-artist-profile',
  templateUrl: './art-craft-artist-profile.component.html',
  styleUrls: ['./art-craft-artist-profile.component.scss']
})
export class ArtCraftArtistProfileComponent {

  @Input() artists: { name: string, nameHindi: string, image: string, content: string, contentHindi: string }[];

  constructor(
    public authService: AuthorizationService
  ) {
  }

}
