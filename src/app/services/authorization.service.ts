import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {


  base_url = 'https://cms.rajasthansafar.com/wp-json/acf/v3';
  mail_url = 'https://mailer.bncmusical.co.in/sendmail';
  isHindi: boolean;


  constructor(
    private http: HttpClient,
    public sanatizer: DomSanitizer,
    private router: Router
  ) {
    this.isHindi = false;
  }

  getReq(relativeUrl: string, nonbase?: boolean, perPage?: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    if (nonbase && nonbase === true) {
      return this.http.get(encodeURI(relativeUrl), httpOptions);
    } else {
      if (!perPage) {
        return this.http.get(encodeURI(this.base_url + '/' + relativeUrl + '?per_page=50'), httpOptions);
      } else {
        return this.http.get(encodeURI(this.base_url + '/' + relativeUrl + '?per_page=' + perPage), httpOptions);
      }
    }
  }

  sanatizeUrl(url: string) {
    let returnUrl: SafeResourceUrl;
    if (url.length) {
      returnUrl = this.sanatizer.bypassSecurityTrustResourceUrl(url);
      return returnUrl;
    }
  }

  sanatizeVideoUrl(url: string) {
    let returnUrl: SafeResourceUrl;
    if (url.length) {
      returnUrl = this.sanatizer.bypassSecurityTrustUrl(url);
      return returnUrl;
    }

  }

  navigateToPage(link) {
    this.router.navigate([link]);
  }


  sendMail(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.mail_url, body, httpOptions);
  }

  trimWords(input: string, trimNum: number) {
    let words = input.split(' ');
    if (trimNum < words.length) {
      words = words.slice(0, trimNum);
      return (words.join(' ') + '...');
    } else {
      return input;
    }
  }

}
