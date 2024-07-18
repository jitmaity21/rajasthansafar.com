import {Component, OnInit} from '@angular/core';
import {NavService} from '../../services/nav.service';
import {CategoryParent, ExploreData} from './explore-data';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  categories: CategoryParent;
  craftsId: number;
  uncategorizedId: number;

  constructor(private navService: NavService) {
  }

  ngOnInit(): void {
    new ExploreData(this.navService).getCategories()
      .then(res => {
        this.categories = res.categories;
        this.craftsId = res.craftsId;
        this.uncategorizedId = res.uncategorizedId;
      });
  }

  goToProduct(id: number, name: string) {
    this.navService.navigateToPage('explore/' + id, undefined, {name});
  }

}
