import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-village-quick-facts',
  templateUrl: './village-quick-facts.component.html',
  styleUrls: ['./village-quick-facts.component.scss']
})
export class VillageQuickFactsComponent implements OnInit {

  @Input() village: { name: string, howToReach: string, distances: { location: string, distance: number }[], busStop: string, busStopDistance: string, railwayStation: string, railwayStationDistance: string, airport: string, airportDistance: string, stay: string, contact: string, mapImage: string };

  constructor() { }

  ngOnInit(): void {
    this.village = {
      name: 'Patodi',
      howToReach: 'Patodi is located in Balotra Tehsil',
      distances: [{ location: 'Jodhpur', distance: 107 },
      { location: 'Padhpara', distance: 25 }],
      busStop: 'Khandra', busStopDistance: null,
      railwayStation: 'Pachpadrra', railwayStationDistance: null,
      airport: 'Jodhpur', airportDistance: null,
      stay: 'Pachpadra', contact: 'info@rajasthansafar.com',
      mapImage: null
    }
  }

}
