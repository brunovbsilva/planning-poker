import { Component, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {}

  login() {
    this.auth.signInWithPopup(this.googleAuthProvider())
      .then(() => this.ngZone.run(() => this.router.navigate(['rooms'])));
  }

  googleAuthProvider() {
    return new firebase.auth.GoogleAuthProvider();
  }
}
