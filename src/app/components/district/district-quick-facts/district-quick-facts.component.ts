import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-district-quick-facts',
  templateUrl: './district-quick-facts.component.html',
  styleUrls: ['./district-quick-facts.component.scss']
})
export class DistrictQuickFactsComponent implements OnInit, AfterViewInit {

  @Input() district: { name: string, mapImage: string, districtVideo: SafeResourceUrl, weather: string, hotel: string, carHire: string, cabApp: string, foodApp: string, distances: { name: string, distance: string }[] };
  weatherImage: string = '../../../../assets/components/district/weather_icon.png';

  constructor(
    private _authService: AuthorizationService
  ) {
  }

  ngOnInit(): void {
    this.district = {
      name: null,
      mapImage: '../../../../assets/components/district/dist_map.png',
      districtVideo: null,
      weather: 'Warm',
      hotel: '4 Star Available',
      carHire: 'Available',
      cabApp: 'Not Available',
      foodApp: 'Not Avaiable',
      distances: []
    };
  }

  ngAfterViewInit() {
    this.getWeather(this.district.name);
  }

  getWeather(location: string) {
    let req = 'https://api.weatherapi.com/v1/current.json?key=8a22e0210f8f490ba21114433202704&q=' + location;
    this._authService.getReq(req, true).subscribe((data: any) => {
      if (data.current && data.current.condition) {
        this.district.weather = data.current.condition.text;
        this.weatherImage = 'https:' + data.current.condition.icon;
      }
    })
  }

}
