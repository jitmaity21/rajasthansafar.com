import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { title } from 'process';

@Component({
  selector: 'app-collaborations',
  templateUrl: './collaborations.component.html',
  styleUrls: ['./collaborations.component.scss']
})
export class CollaborationsComponent {

  connecteds: { title: { english: string, hindi: string } | false, details: { english: string, hindi: string } | false, image: string | false }[];
  comments: { name: string, comment: string, image: string, date: string }[];

  constructor(
    public authService: AuthorizationService
  ) {
    this.getConnecteds();
    this.getComments();
  }

  getConnecteds() {
    this.authService.getReq('tours_get_connecteds?per_page=20').subscribe((data: any[]) => {
      this.connecteds = data.map((conncted: any) => {
        return {
          title: conncted.acf.title ? { english: conncted.acf.title.english, hindi: conncted.acf.title.hindi } : false,
          details: conncted.acf.details ? { english: conncted.acf.details.english, hindi: conncted.acf.details.hindi } : false,
          image: conncted.acf.image ? conncted.acf.image : false
        }
      })
    });
  }

  getComments() {
    this.authService.getReq('tour_guest_comments?per_page=20').subscribe((data: any[]) => {
      this.comments = data.map((comment: any) => {
        return {
          name: comment.acf.guest_name,
          comment: comment.acf.comment,
          image: comment.acf.guest_picture,
          date: comment.acf.comment_date
        }
      });
      window.scrollTo({ top: 0 });
    });
  }

}
