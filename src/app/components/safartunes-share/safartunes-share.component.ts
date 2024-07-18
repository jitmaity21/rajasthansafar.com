import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavService, SAFARTUNES_IMGS, SAFARTUNES_SHARE_JSON, SAFARTUNES_SHARE_MP3} from '../../services/nav.service';

@Component({
  selector: 'app-safartunes-share',
  templateUrl: './safartunes-share.component.html',
  styleUrls: ['./safartunes-share.component.scss']
})
export class SafartunesShareComponent implements OnInit {
  mp3Url: string;
  songData: SongData;

  constructor(private route: ActivatedRoute, private navService: NavService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(path => {
      this.mp3Url = `${SAFARTUNES_SHARE_MP3}${path.uuid}.mp3`;
      this.fetchData(path.uuid);
    });
  }

  private fetchData(uuid: string) {
    this.navService.getJson(`${SAFARTUNES_SHARE_JSON}${uuid}`, true)
      .then((res: SongData) => {
        // Split needed because the current json has the wrong file extension
        res.image = `${SAFARTUNES_IMGS}${res.image.split('.')[0]}.webp`;
        this.songData = res;
      });
  }

}

interface SongData {
  name: string;
  image: string;
  artist: string[];
  genre: string;
  themes: string[];
  album: string;
  intro: string;
}
