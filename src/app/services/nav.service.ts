import {Injectable} from '@angular/core';
import {NavigationEnd, Params, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const BASE_URL = 'https://cms.rajasthansafar.com/wp-json/acf/v3';
export const BASE_URL_WP = 'https://cms.rajasthansafar.com/wp-json/wp/v2';
const BASE_URL_WC = 'https://cms.rajasthansafar.com/wp-json/wc/v3';
export const BASE_URL_JWT = 'https://cms.rajasthansafar.com/wp-json/jwt-auth/v1';
// const BASE_URL_WC = 'http://localhost:8000/wp-json/wc/v3';
const MAILER_URL = 'https://mailer.bncmusical.co.in/sendmail';
const MAILER_TITLE = 'RSH';
const MAILER_MAILTO = 'info@rajasthansafar.com';
//export const ORDERS_URL = 'http://localhost:4000';
export const ORDERS_URL = 'https://cmsmd.rajasthansafar.com';
export const SAFARTUNES_SHARE_MP3 = 'https://safartunesdata.blob.core.windows.net/song-clips-5d3gh45/songs/';
export const SAFARTUNES_SHARE_JSON = 'https://safartunesdata.blob.core.windows.net/song-clips-5d3gh45/jsons/';
export const SAFARTUNES_IMGS = 'https://safartunesdata.blob.core.windows.net/app-data/imgs/songs/';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  isEnglish = true;
  currentRouterPath: string;

  // oauth: OAuth;

  constructor(private router: Router, private http: HttpClient) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // removing leading '/' and parameters (if any)
        let path = '';
        for (let i = 1; i < event.url.length; i++) {
          if (event.url[i] === '?' || event.url[i] === '/') {
            break;
          }
          path += event.url[i];
        }
        this.currentRouterPath = path;
      }
    });
  }

  navigateToPage(link: string, queryParams?: Params, state?: { [k: string]: any }) {
    this.router.navigate([link], {queryParams, state})
      .then(success => {
        if (success) {
          // scrollToTop();
        }
      });
  }

  getJson(relativeUrl: string, nonBase?: boolean, useWp?: boolean): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };
      let url;
      if (useWp) {
        url = `${BASE_URL_WP}/${relativeUrl}`;
      } else if (!nonBase) {
        url = `${BASE_URL}/${relativeUrl}`;
      } else {
        url = relativeUrl;
      }
      this.http.get(encodeURI(url), httpOptions).subscribe(data => resolve(data), error => reject(error.message));
    });
  }

  /*
   * OAuth is not used, so if anything other than Products and Categories need to be fetched, add a 'woocommerce_rest_check_permissions'
   * filter for it in WordPress.
   */
  getWCJson(relativeUrl: string): Promise<object> {
    /* if (!this.oauth) {
      this.oauth = new OAuth({
        // consumer: {key: 'ck_f56781ea0a0d151df54b02bfd75170a370836be7', secret: 'cs_c02d67e32325a1e4b37ff35f4a60f91c482eb493'},  // Local
        consumer: {key: 'ck_a6fffddaf5a3d2028e940246e003ef77e16e8576', secret: 'cs_9730323cd27198641d07f8912e8437d85af04015'},
        signature_method: 'HMAC-SHA1',
        hash_function: (baseString, key) => {
          return CryptoJs.HmacSHA1(baseString, key).toString(CryptoJs.enc.Base64);
        },
      });
    } */

    return new Promise<object>((resolve, reject) => {
      /* const requestData = {
        url: `${this.BASE_URL_WC}/${relativeUrl}`,
        method: 'GET'
      }; */
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          //  ...this.oauth.toHeader(this.oauth.authorize(requestData))
        }),
      };

      this.http.get(encodeURI(`${BASE_URL_WC}/${relativeUrl}`), httpOptions).subscribe(resolve, error => reject(error.message));
    });
  }

  getLangString(text: Languages): string {
    return this.isEnglish ? text.english : text.hindi;
  }

  truncateText(text: string, chars: number): string {
    return text.length <= chars ? text : text.substr(0, chars) + '...';
  }

  sendEnquiryMail(username: string, userEmail: string, phone: string, products: { name: string, sku: string }[]): Promise<void> {
    const productsStr = products.reduce((acc, product) => {
      return `${acc}<br><b>Name:</b> ${product.name}, <b>SKU:</b> ${product.sku ? product.sku : 'Unavailable'}`;
    }, '');

    // (email spam incoming)
    const body = {
      emailTitle: `Rajasthan Safar Hub query from ${username}`,
      emailBody: `<b>User Name:</b> ${username}<br><b>Email:</b> ${userEmail}<br><b>Phone:</b> ${phone}<br><br><b>Products:</b>${productsStr}`
    };
    return this.sendMail(body);
  }

  sendMail(body: any): Promise<void> {
    body.senderTitle = MAILER_TITLE;
    body.email = MAILER_MAILTO;

    return new Promise<void>((resolve, reject) => {
      this.http.post(encodeURI(MAILER_URL), body)
        .subscribe(() => resolve(), error => reject(error));
    });
  }
}

export interface Languages {
  english: string;
  hindi: string;
}
