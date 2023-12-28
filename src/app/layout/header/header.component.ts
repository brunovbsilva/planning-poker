import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private auth: AngularFireAuth,
    private router: Router) { }

  ngOnInit(): void {}

  logout() {
    this.auth.signOut().then(() => this.router.navigate(['']));
  }
}
