import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-art-craft',
  templateUrl: './art-craft.component.html',
  styleUrls: ['./art-craft.component.scss']
})
export class ArtCraftComponent implements OnInit, OnChanges {

  banner: { image: string, caption: string };
  styledIntroContent: { title: string, titleHindi: string, subTitle: string, subTitleHindi: string, content: string, contentHindi: string };
  gallery: { type: string, link: string }[] = [];
  features: { image: string, name: string, content: string, nameHindi: string, contentHindi: string }[];
  artists: { name: string, nameHindi: string, image: string, content: string, contentHindi: string }[];
  products: { name: string, image: string }[];
  villages: { name: string, subHeading: string, content: string, image: string, link: string, nameHindi: string, subHeadingHindi: string, contentHindi: string }[] = [];
  crafts: { name: string, image: string }[];
  type: string;
  currentCraftId: number;

  constructor(
    private route: ActivatedRoute,
    private _authService: AuthorizationService
  ) {
    route.params.subscribe((data: any) => {
      this.currentCraftId = data.craftId;
      this.getCraft(data.craftId);
    });
  }

  ngOnChanges() {

  }

  ngOnInit(): void {
  }

  getCraft(craftId: string) {
    this.gallery = [];
    this.crafts = [];
    this._authService.getReq('arts_crafts/' + craftId).subscribe((data: any) => {
      this.banner = { image: data.acf.banner_image, caption: data.acf.banner_caption };
      this.styledIntroContent = { title: data.acf.name, titleHindi: data.acf.namehindi, subTitle: data.acf.sub_heading, subTitleHindi: data.acf.sub_headinghindi, content: data.acf.introduction, contentHindi: data.acf.introductionhindi };
      data.acf.gallery.forEach(element => {
        // console.log(element);
        let obj: any;
        if (element.type === 'Image') {
          obj = { type: element.type, link: element.image };
        } else if (element.type === 'Video') {
          obj = { type: element.type, link: this._authService.sanatizeUrl(element.video) };
        }
        this.gallery.push(obj);
      });
      if (data.acf.type) {
        this.type = data.acf.type;
      }
      if (data.acf.features) {
        this.features = data.acf.features.map((feature: any) => {
          return {
            image: feature.feature_image, name: feature.feature_name, content: feature.feature_content, nameHindi: feature.feature_namehindi, contentHindi: feature.feature_contenthindi
          }
        });
      }
      if (data.acf.artists.length) {
        this.getArtists(data.acf.artists);
      }
      if (data.acf.product_gallery) {
        this.products = data.acf.product_gallery.map((product: any) => {
          return {
            name: product.gallery_title, image: product.gallery_image
          }
        });
      }
      this.getVillages(data.acf.villages);
      this.getCrafts();
      window.scrollTo({ top: 0 });
    });
  }

  getArtists(input: number[]) {
    this._authService.getReq('artists').subscribe((theArtists: any[]) => {
      this.artists = theArtists.map((artist: any) => {
        if (input.indexOf(artist.id) !== -1) return {
          name: artist.acf.name,
          nameHindi: artist.acf.name_hindi,
          image: artist.acf.image,
          content: artist.acf.content,
          contentHindi: artist.acf.content_hindi
        }
      }).filter(artist => artist);
    })
  }

  getVillages(villageIds: number[]) {
    this._authService.getReq('villages').subscribe((datas: any[]) => {
      datas.forEach((data: any) => {
        if ((villageIds.indexOf(data.id)) !== -1) {
          this.villages.push({ name: data.acf.name, subHeading: data.acf.sub_heading, content: data.acf.homepage_intro, image: data.acf.homepage_image, link: '/village/' + data.id, nameHindi: data.acf.namehindi, subHeadingHindi: data.acf.subheadinghindi, contentHindi: data.acf.carousel_introhindi })
        }
      })
    })
  }

  getCrafts() {
    this._authService.getReq('arts_crafts').subscribe((datas: any[]) => {
      this.crafts = datas.map((data: any) => {
        return {
          name: data.acf.name,
          image: data.acf.cover_picture_flip,
          attractionId: null,
          craftId: data.id
        }
      })
    })
  }

}
