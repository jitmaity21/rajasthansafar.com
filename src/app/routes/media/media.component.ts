import { Component, ViewChild } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent {

  @ViewChild('mediaModal') mediaModal: ModalDirective;
  data: any;
  p: number = 1;
  q: number = 1;
  prints: { title: string, titleHindi: string, author: string, authorHindi: string, link: string, ext_link: string }[];
  electronics: SafeResourceUrl[];
  constructor(
    public authService: AuthorizationService
  ) {
    this.getMedia();
  }

  getMedia() {
    this.authService.getReq('medias').subscribe((medias: any[]) => {
      this.prints = medias.map((media: any) => {
        if (media.acf.type === 'Print') {
          return {
            title: media.acf.title,
            titleHindi: media.acf.title_hindi,
            author: media.acf.author,
            authorHindi: media.acf.authorHindi,
            link: media.acf.print_picture,
            ext_link: media.acf.link
          }
        }
      }).filter(media => media);
      this.electronics = medias.map((media: any) => {
        if (media.acf.type === 'Electronic') {
          return this.authService.sanatizeUrl(media.acf.youtube_link);
        }
      }).filter(electronic => electronic);
      window.scrollTo({ top: 0 });
    })
  }

  triggerModal(input: any) {
    if (this.authService.isHindi) {
      this.data = {
        title: input.titleHindi,
        author: input.authorHindi,
        picture: input.link,
        ext_link: input.ext_link
      }
    } else {
      this.data = {
        title: input.title,
        author: input.author,
        picture: input.link,
        ext_link: input.ext_link
      }
    }
    this.mediaModal.show();
  }

}
