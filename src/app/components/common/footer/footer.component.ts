import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  districts: any[];
  arts: any[];

  validatingForm: FormGroup;

  @ViewChild('frame') frame: ModalDirective;

  constructor(
    public _authService: AuthorizationService
  ) {
    _authService.getReq('districts').subscribe((datas: any[]) => {
      this.districts = datas.map((district: any) => {
        return {
          name: district.acf.name,
          id: district.id
        }
      }).filter((district) => district);
    });
    _authService.getReq('arts_crafts').subscribe((datas: any[]) => {
      this.arts = datas.map((district: any) => {
        if (district.acf.featured_on_homepage) {
          return {
            name: district.acf.name,
            id: district.id
          }
        }
      }).filter((district) => district);
    });
  }

  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      contactFormModalName: new FormControl('', Validators.required),
      contactFormModalEmail: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      contactFormModalSubject: new FormControl('', Validators.required),
      contactFormModalMessage: new FormControl('', Validators.required)
    });
  }

  get contactFormModalName() {
    return this.validatingForm.get('contactFormModalName');
  }

  get contactFormModalEmail() {
    return this.validatingForm.get('contactFormModalEmail');
  }

  get contactFormModalSubject() {
    return this.validatingForm.get('contactFormModalSubject');
  }

  get contactFormModalMessage() {
    return this.validatingForm.get('contactFormModalMessage');
  }


  send() {
    if (this.validatingForm.status === 'VALID') {
      const body = {
        email: 'info@rajasthansafar.com',
        emailTitle: 'Enquiry from Rajasthan Safar',
        emailBody: '<h3>' + this.validatingForm.value.contactFormModalName + ' just made an enquiry </h3>' + '<p>Name: ' + this.validatingForm.value.contactFormModalName + '</p><p>Email: ' + this.validatingForm.value.contactFormModalEmail + '</p><p> Subject: ' + this.validatingForm.value.contactFormModalSubject + '</p><p> Message: ' + this.validatingForm.value.contactFormModalMessage + '</p>'
      };
      this._authService.sendMail(body).subscribe(
        (data: any) => {
          // console.log('data', data, 'body', body);
        }
      );
    }
  }

  socialNavigate(input: string) {
    if (input === "fb") {
      window.open("https://www.facebook.com/ich.safar/")
    } else if (input === "ig") {
      window.open("https://www.instagram.com/rajasthan_safar/");
    } else if (input === "yt") {
      window.open("https://www.youtube.com/channel/UCa9bq9HCIDJJlrLpQSNOb2w");
    }
  }

  public showForm() {
    this.frame.show();
  }

}
