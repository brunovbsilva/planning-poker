import {Component, computed, NgZone, OnInit, Signal} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MainButtonDirective } from '../../shared/directives/main-button/main-button.directive';
import {UserService} from "../../services/user/user.service";
import {IUser} from "../../services/auth/models/user.interface";
import {User} from "../../services/auth/models/user.model";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [RouterLink, MainButtonDirective]
})
export class HeaderComponent {

  name$ = computed(() => this.user.user$()?.name);
  image$ = computed(() => this.user.user$()?.image);

  constructor(
    private user: UserService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  async logout() {
    this.user.removeUser();
    setTimeout(() => this.ngZone.run(() => this.router.navigate([''])), 1);
  }
}
