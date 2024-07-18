import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-homepage-districts-map',
  templateUrl: './homepage-districts-map.component.html',
  styleUrls: ['./homepage-districts-map.component.scss']
})
export class HomepageDistrictsMapComponent implements OnInit, AfterViewInit {

  districtMap: HTMLImageElement;
  jaisalmerMap: HTMLAreaElement;
  barmerMap: HTMLAreaElement;
  jodhpurMap: HTMLAreaElement;
  bikanerMap: HTMLAreaElement;

  districts: { name: string, image: string, crafts: string[] }[];
  selectedDistrict: number;

  constructor(
    private _authService: AuthorizationService,
    private router: Router
  ) {
    this.districts = [
      { name: 'Barmer', image: null, crafts: [] },
      { name: 'Jaisalmer', image: null, crafts: [] },
      { name: 'Bikaner', image: null, crafts: [] },
      { name: 'Jodhpur', image: null, crafts: [] }
    ];
    this.getCraftImages();
    this.getCrafts();
  }

  ngOnInit(): void {
    this.districtMap = (document.getElementById('districtMap') as any as HTMLImageElement);
    this.jaisalmerMap = (document.getElementById('jaisalmerMap') as any as HTMLAreaElement);
    this.barmerMap = (document.getElementById('barmerMap') as any as HTMLAreaElement);
    this.jodhpurMap = (document.getElementById('jodhpurMap') as any as HTMLAreaElement);
    this.bikanerMap = (document.getElementById('bikanerMap') as any as HTMLAreaElement);

    this.jaisalmerMap.onmouseover = () => {
      this.districtMap.src = '../../../../assets/components/homepage/jaisalmerMap.png';
      this.selectedDistrict = 1;
    }
    this.jaisalmerMap.onclick = () => {
      this.router.navigate(['district/148']);
    }
    this.barmerMap.onmouseover = () => {
      this.districtMap.src = '../../../../assets/components/homepage/barmerMap.png';
      this.selectedDistrict = 0;
    }
    this.barmerMap.onclick = () => {
      this.router.navigate(['district/111']);
    }
    this.jodhpurMap.onmouseover = () => {
      this.districtMap.src = '../../../../assets/components/homepage/jodhpurMap.png';
      this.selectedDistrict = 3;
    }
    this.jodhpurMap.onclick = () => {
      this.router.navigate(['district/150']);
    }
    this.bikanerMap.onmouseover = () => {
      this.districtMap.src = '../../../../assets/components/homepage/bikanerMap.png';
      this.selectedDistrict = 2;
    }
    this.bikanerMap.onclick = () => {
      this.router.navigate(['district/149']);
    }

  }

  ngAfterViewInit() {
    $('map').imageMapResize();
  }

  getCraftImages() {
    // Barmer
    this._authService.getReq('districts/111').subscribe((data: any) => {
      this.districts[0].image = data.acf.crafts_group_image;
    });
    // Jaisalmer
    this._authService.getReq('districts/148').subscribe((data: any) => {
      this.districts[1].image = data.acf.crafts_group_image;
    });
    // Bikaner
    this._authService.getReq('districts/149').subscribe((data: any) => {
      this.districts[2].image = data.acf.crafts_group_image;
    });
    // Jodhpur
    this._authService.getReq('districts/150').subscribe((data: any) => {
      this.districts[3].image = data.acf.crafts_group_image;
    });
  }

  getCrafts() {
    this._authService.getReq('arts_crafts').subscribe((crafts: any[]) => {
      crafts.forEach((craft: any) => {
        if (craft.acf.districts.indexOf(111) !== -1) {
          this.districts[0].crafts.push(craft.acf.name);
        }
        if (craft.acf.districts.indexOf(148) !== -1) {
          this.districts[1].crafts.push(craft.acf.name);
        }
        if (craft.acf.districts.indexOf(149) !== -1) {
          this.districts[2].crafts.push(craft.acf.name);
        }
        if (craft.acf.districts.indexOf(150) !== -1) {
          this.districts[3].crafts.push(craft.acf.name);
        }
      })
    })
  }

}
