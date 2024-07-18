import {Component, OnInit} from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit {

  // 0 = login, 1 = register, 2 = forgot password, 3 = enums-dont-work-in-templates
  type = 0;
  isForm = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  passwordForm: FormGroup;
  message: string;
  loading: boolean;

  constructor(public modalRef: MDBModalRef, private userService: UserService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      loginEmail: new FormControl('', [Validators.email, Validators.required]),
      loginPassword: new FormControl('', Validators.required)
    });

    this.registerForm = new FormGroup({
      regName: new FormControl('', [Validators.minLength(5), Validators.required]),
      regEmail: new FormControl('', [Validators.email, Validators.required]),
      regPhone: new FormControl('', [Validators.pattern('[0-9]{10}'), Validators.required]),
      regPassword: new FormControl('', Validators.required)
    });

    this.passwordForm = new FormGroup({
      passEmail: new FormControl('', [Validators.email, Validators.required]),
    });
  }

  onSubmit() {
    this.loading = true;
    switch (this.type) {
      case 0:
        this.userService.login(this.loginEmail.value, this.loginPassword.value)
          .then(() => this.modalRef.hide())
          .catch(err => {
            this.message = err.status === 403 ? 'Invalid email or password' : err.statusText;
            this.loading = false;
          });
        break;
      case 1:
        this.userService.register(this.regEmail.value, this.regName.value, this.regPhone.value, this.regPassword.value)
          .then(() => this.modalRef.hide())
          .catch(err => {
            console.log(err);
            let errMsg = err.error?.message ?? err.statusText;
            if (errMsg === 'Username already exists, please enter another username') {
              errMsg = 'User already exists, try logging in';
            }
            this.message = errMsg;
            this.loading = false;
          });
        break;
      case 2:
        this.userService.forgotPass(this.passEmail.value)
          .then(() => {
            this.message = 'A password reset link has been emailed to you.';
            this.loading = false;
          })
          .catch(err => {
            this.message = err.error?.message ?? err.statusText;
            this.loading = false;
          });
        break;
    }
  }

  changeType(index: number) {
    this.type = index;
    this.message = null;
  }

  get loginEmail() {
    return this.loginForm.get('loginEmail');
  }

  get loginPassword() {
    return this.loginForm.get('loginPassword');
  }

  get regName() {
    return this.registerForm.get('regName');
  }

  get regEmail() {
    return this.registerForm.get('regEmail');
  }

  get regPhone() {
    return this.registerForm.get('regPhone');
  }

  get regPassword() {
    return this.registerForm.get('regPassword');
  }

  get passEmail() {
    return this.passwordForm.get('passEmail');
  }
}
