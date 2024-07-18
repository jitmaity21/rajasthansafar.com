import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit {

  banner: { image: string, caption: string };
  styledIntroContent: { title: any, titleHindi: string, subTitle: any, subTitleHindi: string, content: any, contentHindi: string };
  quickFacts: { name: string, mapImage: string, districtVideo: SafeResourceUrl, weather: string, hotel: string, carHire: string, cabApp: string, foodApp: string, distances: { name: string, distance: string }[] };
  arts: { title: string, titleHindi: string, subTitle: string, subTitleHindi: string, image: string, link: string, description: string, descriptionHindi: string }[];
  villages: { name: string, nameHindi: string, subHeading: string, subHeadingHindi: string, content: string, contentHindi: string, image: string, link: string }[];
  events: { date: string, image: string }[];
  attractions: { name: string, name_hindi: string, image: string }[];

  constructor(
    private route: ActivatedRoute,
    private _authService: AuthorizationService
  ) {
    route.params.subscribe((data: any) => {
      this.getDistrict(data.districtId);
    })
  }

  ngOnInit(): void {
  }

  getDistrict(districtId: string) {
    this._authService.getReq('districts/' + districtId).subscribe((data: any) => {
      let theDistances = null;
      if (data.acf.qf_distances) {
        theDistances = data.acf.qf_distances.map((distance: any) => {
          return {
            name: distance.place,
            distance: distance.how_many_kms
          }
        })
      }
      this.banner = { image: data.acf.banner_image, caption: data.acf.banner_caption };
      this.styledIntroContent = { title: data.acf.name, titleHindi: data.acf.name_hindi, subTitle: data.acf.sub_heading, subTitleHindi: data.acf.sub_heading_hindi, content: data.acf.introduction, contentHindi: data.acf.introduction_hindi };
      this.quickFacts = {
        name: data.acf.name,
        mapImage: data.acf.map_image,
        districtVideo: this._authService.sanatizeUrl(data.acf.district_video),
        weather: 'warm',
        hotel: data.acf.hotel_availability,
        carHire: data.acf.car_hire_availability,
        cabApp: data.acf.cab_app_availability,
        foodApp: data.acf.food_app_availabilty,
        distances: theDistances
      };
      this.getArts(districtId);
      this.getVillages(districtId);
      this.getEvents();
      this.getAttractions(districtId);
      window.scrollTo({ top: 0 });
    })
  }

  getArts(input: any) {
    this._authService.getReq('arts_crafts').subscribe((datas: any[]) => {
      this.arts = datas.map((data: any) => {
        // console.l
        if (data.acf.districts.indexOf(parseInt(input)) !== -1) return {
          title: data.acf.name,
          titleHindi: data.acf.namehindi,
          subTitle: data.acf.sub_heading,
          subTitleHindi: data.acf.sub_headinghindi,
          image: data.acf.cover_picture_flip,
          link: 'art&craft/' + data.id,
          description: this._authService.trimWords(data.acf.introduction, 40),
          descriptionHindi: this._authService.trimWords(data.acf.introductionhindi, 40)
        }
      }).filter(art => art)
    })
  }

  getVillages(districtId: string) {
    this._authService.getReq('villages').subscribe((datas: any[]) => {
      this.villages = datas.map((data: any) => {
        if (data.acf.parent_district === parseInt(districtId)) {
          return {
            name: data.acf.name,
            nameHindi: data.acf.namehindi,
            subHeading: data.acf.sub_heading,
            subHeadingHindi: data.acf.subheadinghindi,
            content: data.acf.homepage_intro,
            contentHindi: data.acf.carousel_introhindi,
            image: data.acf.homepage_image,
            link: '/village/' + data.id
          }
        }
      }).filter((data) => data);
    })
  };

  getEvents() {
    this._authService.getReq('events').subscribe((events: any[]) => {
      this.events = events.map((event: any) => {
        if (Date.now() < Date.parse(event.acf.end_date)) {
          return {
            date: event.acf.date,
            image: event.acf.cover_picture,
            id: event.id
          }
        }
      }).filter((event) => event);
    })
  }

  getAttractions(districtId: string) {
    this._authService.getReq('attractions').subscribe((datas: any[]) => {
      this.attractions = datas.map((attraction: any) => {
        if (attraction.acf.districts.indexOf(parseInt(districtId)) !== -1) {
          return {
            name: this._authService.trimWords(attraction.acf.name, 3),
            name_hindi: this._authService.trimWords(attraction.acf.name_hindi ? attraction.acf.name_hindi :attraction.acf.name, 3),
            image: attraction.acf.cover_picture,
            craftId: null,
            attractionId: attraction.id
          }
        }
      }).filter((attraction) => attraction);
    })
  }

}
