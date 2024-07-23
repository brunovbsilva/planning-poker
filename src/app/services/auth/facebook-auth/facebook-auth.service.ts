import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserService} from "../../user/user.service";
import firebase from "firebase/compat/app";
import {User} from "../models/user.model";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class FacebookAuthService extends AuthService {
  constructor(
    private auth: AngularFireAuth,
    private user: UserService
  ) {
    super(user);
  }

  override async login(): Promise<void> {
    await this.auth
      .signInWithPopup(this.facebookAuthProvider())
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

  facebookAuthProvider() {
    return new firebase.auth.FacebookAuthProvider();
  }
}
