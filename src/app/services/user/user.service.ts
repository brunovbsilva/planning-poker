import {computed, Injectable, signal} from '@angular/core';
import {IUser} from "../auth/models/user.interface";
import firebase from "firebase/compat";
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected readonly _user = signal<IUser | null>(null);
  public logged$ = computed<boolean>(() => !!this._user());
  public user$ = this._user.asReadonly();

  setUser(user: IUser) {
    this._user.set(user);
  }
  removeUser() {
    this._user.set(null);
  }
}
