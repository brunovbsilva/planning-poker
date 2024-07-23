import { Injectable } from '@angular/core';
import {AuthService} from "../auth.service";
import firebase from "firebase/compat";
import {User} from "../models/user.model";
import {UserService} from "../../user/user.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService extends AuthService {
  constructor(
    private auth: AngularFireAuth,
    private user: UserService
  ) {
    super(user);
  }

  override async login(): Promise<void> {
    await this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((user) =>
        this.user.setUser(
          new User(
            user.user?.displayName,
            user.user?.photoURL,
            user.user?.tenantId
          )
        )
      );
  }
}
