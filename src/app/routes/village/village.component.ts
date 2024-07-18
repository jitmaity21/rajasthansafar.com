import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.scss']
})
export class VillageComponent implements OnInit {

  banner: { image: string, caption: string };
  styledIntroContent: { title: string, titleHindi: string, subTitle: string, subTitleHindi: string, content: string, contentHindi: string };
  snippets: any[];
  quickFacts: { name: string, howToReach: string, distances: { location: string, distance: number }[], busStop: string, busStopDistance: string, railwayStation: string, railwayStationDistance: string, airport: string, airportDistance: string, stay: string, contact: string, mapImage: string };
  crafts: { name: string, subHeading: string, content: string, image: string, link: string, nameHindi: string, subHeadingHindi: string, contentHindi: string }[];
  attractions: { name: string, image: string }[];
  events: { date: string, image: string }[];
  artists: { name: string, nameHindi: string, image: string, content: string, contentHindi: string }[];

  constructor(
    private route: ActivatedRoute,
    private _authService: AuthorizationService
  ) {
    route.params.subscribe((route: any) => {
      this.getVillage(route.villageId);
      this.getEvents();
      this.getAttractions(route.villageId);
      this.getCrafts(route.villageId);
    })
  }

  ngOnInit(): void {
  }

  getCrafts(villageId: string) {
    this._authService.getReq('arts_crafts').subscribe((data: any[]) => {
      this.crafts = data.map((element: any) => {
        if (element.acf.villages && element.acf.villages.indexOf(parseInt(villageId)) !== -1) return {
          name: element.acf.name,
          subHeading: element.acf.sub_heading,
          content: element.acf.carousel_intro,
          nameHindi: element.acf.namehindi,
          contentHindi: element.acf.carousel_introhindi,
          link: 'art&craft/' + element.id,
          image: element.acf.carousel_image,
          subHeadingHindi: element.acf.sub_headinghindi
        }
      }).filter((element) => element);
    })
  }

  getVillage(villageId: string) {
    this._authService.getReq('villages/' + villageId).subscribe((data: any) => {
      this.banner = { image: data.acf.banner_image, caption: data.acf.banner_caption };
      this.styledIntroContent = { title: data.acf.name, titleHindi: data.acf.namehindi, subTitle: data.acf.sub_heading, subTitleHindi: data.acf.subheadinghindi, content: data.acf.introduction, contentHindi: data.acf.introductionhindi };
      if (data.acf.snippets) {
        this.snippets = data.acf.snippets.map((snippet: any) => {
          return {
            image: snippet.image,
            title: snippet.heading,
            content: snippet.snippet_text,
            titleHindi: snippet.headinghindi,
            contentHindi: snippet.snippet_texthindi
          }
        });
      }
      let theDistances = [];
      if (data.acf.qf_distances) {
        theDistances = data.acf.qf_distances.map((distance: any) => {
          return {
            location: distance.place, distance: distance.how_many_kms
          }
        });
      };
      if (data.acf.artists) {
        this.getArtists(data.acf.artists);
      }
      this.quickFacts = {
        name: data.acf.name, howToReach: data.acf.qf_how_to_reach,
        distances: theDistances, busStop: data.acf.qf_nearest_bus_stop,
        busStopDistance: data.acf.qf_busstop_distance,
        railwayStation: data.acf.qf_nearest_railway_station, railwayStationDistance: data.acf.qf_railway_distance,
        airport: data.acf.qf_nearest_airport, airportDistance: data.acf.qf_airport_distance,
        stay: data.acf.qf_where_to_stay, contact: data.acf.qf_contact,
        mapImage: data.acf.qf_map_image
      };
      window.scrollTo({ top: 0 });
    });
  }


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
  };

  getAttractions(villageId: string) {
    this._authService.getReq('attractions').subscribe((datas: any[]) => {
      this.attractions = datas.map((attraction: any) => {
        if (attraction.acf.villages && attraction.acf.villages.indexOf(parseInt(villageId)) !== -1) {
          return {
            name: attraction.acf.name,
            image: attraction.acf.cover_picture,
            craftId: null,
            attractionId: attraction.id
          }
        }
      }).filter((attraction) => attraction);
    })
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
    });
  }

}
