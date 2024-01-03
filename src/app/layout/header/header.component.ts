import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit(): void {}

  logout() {
    this.auth.signOut().then(() => this.ngZone.run(() => this.router.navigate([''])));
  }
}
