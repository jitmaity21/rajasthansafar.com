import { Component, OnInit, Input } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-district-art-craft-gallery',
  templateUrl: './district-art-craft-gallery.component.html',
  styleUrls: ['./district-art-craft-gallery.component.scss']
})
export class DistrictArtCraftGalleryComponent implements OnInit {

  @Input() arts: { name: string, image: string, id: string }[];

  constructor(
    private _authService: AuthorizationService
  ) { }

  ngOnInit(): void {
  }

  navigateTo(input: string) {
    if (input) {
      this._authService.navigateToPage('art&craft/' + input);
    }
  }

}
