import { Component, computed, NgZone } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MainButtonDirective } from '../../shared/directives/main-button/main-button.directive';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterLink, MainButtonDirective],
})
export class HeaderComponent {
  name$ = computed(() => this.user.user$()?.name);
  image$ = computed(() => this.user.user$()?.image);

  constructor(
    private user: UserService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  async logout() {
    this.user.removeUser();
    setTimeout(() => this.ngZone.run(() => this.router.navigate([''])), 1);
  }
}
