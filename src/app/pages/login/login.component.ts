import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MainButtonDirective } from '../../shared/directives/main-button/main-button.directive';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {GoogleAuthService} from "../../services/auth/google-auth/google-auth.service";
import {FacebookAuthService} from "../../services/auth/facebook-auth/facebook-auth.service";
import {MainInputDirective} from "../../shared/directives/main-input/main-input.directive";

type LoginType = 'google' | 'facebook' | 'default';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
  imports: [MainButtonDirective, ReactiveFormsModule, MainInputDirective]
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({'name': new FormControl('', Validators.required)});
  constructor(

    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService,
    private googleAuthService: GoogleAuthService,
    private facebookAuthService: FacebookAuthService,
  ) {}

  async login(type: LoginType = 'default') {
    switch (type) {
      case 'google':
        await this.googleAuthService.login()
          .finally(() => this.ngZone.run(() => this.router.navigate(['rooms'])));
        break;
      case 'facebook':
        await this.facebookAuthService.login()
          .finally(() => this.ngZone.run(() => this.router.navigate(['rooms'])));
        break;
      default:
        await this.authService.login(this.loginForm.get('name')?.value)
          .finally(() => this.ngZone.run(() => this.router.navigate(['rooms'])));
        break;
    }
  }
}
