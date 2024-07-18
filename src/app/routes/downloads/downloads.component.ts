import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent {

  categories: { name: string, id: number, downloads: { name: string, nameHindi: string, file: string, brief: string, cover: string }[] }[];
  selectedCategory: { name: string, id: number, downloads: { name: string, nameHindi: string, file: string, brief: string, cover: string }[] };
  selectedDownload: { name: string, nameHindi: string, file: string, brief: string, cover: string };
  constructor(
    private authService: AuthorizationService
  ) {
    this.getCategories();
  }


  getCategories() {
    this.authService.getReq('https://cms.rajasthansafar.com/wp-json/wp/v2/download_taxonomies', true).subscribe((taxonomys: any[]) => {
      this.categories = taxonomys.map((taxonomy: any) => {
        return {
          name: taxonomy.name,
          id: taxonomy.id,
          downloads: []
        }
      });
      this.getDownloads();
    });
  }

  getDownloads() {
    this.authService.getReq('downloads').subscribe((downloads: any[]) => {
      downloads.forEach((download: any) => {
        this.categories.forEach((category: any) => {
          if (category.id === download.acf.category) {
            category.downloads.push({
              name: download.acf.title,
              nameHindi: download.acf.title_hindi,
              file: download.acf.file,
              brief: download.acf.brief,
              cover: download.acf.cover
            });
          }
        })
      })
      this.categories = this.categories.filter(category => category.downloads.length);
      if (this.categories.length) {
        this.selectedCategory = this.categories[0];
        this.selectedDownload = this.categories[0].downloads[0];
      };
      window.scrollTo({ top: 0 });
    });
  }

}
