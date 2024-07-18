import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'angular-bootstrap-md';
import {AuthorizationService} from '../../../services/authorization.service';
import {SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-gallery-videos',
  templateUrl: './gallery-videos.component.html',
  styleUrls: ['./gallery-videos.component.scss']
})
export class GalleryVideosComponent implements OnInit {

  @ViewChild('basicModal') basicModal: ModalDirective;

  p = 1;
  categories: any = {id: 0, name: 'Home', subcategories: []};
  selectedList: any;
  breadCrumbList: any[] = [this.categories];
  gallery: SafeResourceUrl[];
  imageIndex: number;

  constructor(private authService: AuthorizationService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.authService
      .getReq('https://cms.rajasthansafar.com/wp-json/wp/v2/gallery_video_taxonomy?per_page=100', true)
      .subscribe((data: any[]) => {
        this.getChild(data, this.categories);
        this.selectedList = this.categories.subcategories;
      });
  }

  getChild(categories: any[], parent: any) {
    categories.forEach(category => {
      if (category.parent === parent.id) {
        parent.subcategories.push({id: category.id, name: category.name, image: category.acf.image, subcategories: []});
      }
    });
    parent.subcategories.forEach(subcategory => {
      this.getChild(categories, subcategory);
    });
  }

  handleBreadCrumb(input: any, index: number) {
    this.p = 1;
    this.selectedList = input.subcategories;
    this.breadCrumbList.splice(index + 1, 3);
    if (input.subcategories.length) {
      this.gallery = [];
    }
  }

  handleCategories(input: any) {
    if (input.subcategories.length) {
      this.selectedList = input.subcategories;
      this.gallery = [];
    } else {
      this.selectedList = [];
      this.getGallery(input.id);
    }
  }

  getGallery(input: number) {
    this.gallery = [];
    this.p = 1;
    this.authService.getReq('gallery', false, 200).subscribe((data: any[]) => {
      this.gallery = data.map((video: any) => {
        if (video.acf.video_category?.indexOf(input) > -1 && video.acf.youtube_link) {
          return this.authService.sanatizeUrl(video.acf.youtube_link);
        }
      }).filter(video => video);
    });
  }
}
