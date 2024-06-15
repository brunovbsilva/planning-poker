import { Component, NgZone, OnInit, Signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MainButtonDirective } from '../../shared/directives/main-button/main-button.directive';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [RouterLink, MainButtonDirective]
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
