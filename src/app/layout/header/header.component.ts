import { Component, NgZone, OnInit, Signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  protected user: Signal<any>;

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.user = toSignal(auth.user);
  }

  ngOnInit(): void {}

  logout() {
    this.auth.signOut().then(() => this.ngZone.run(() => this.router.navigate([''])));
  }
}
