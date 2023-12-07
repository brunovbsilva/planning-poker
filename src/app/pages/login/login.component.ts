import { Component } from '@angular/core';
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
    private router: Router
  ) {}

  login() {
    this.auth.signInWithPopup(this.googleAuthProvider())
      .then(
        () => this.router.navigate(['rooms']),
        error => console.log(error)
      )
  }

  googleAuthProvider() {
    return new firebase.auth.GoogleAuthProvider();
  }
}
