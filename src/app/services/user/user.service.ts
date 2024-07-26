import { computed, Injectable, signal } from '@angular/core';
import { IUser } from '../auth/models/user.interface';

const USER = 'Logged-User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  protected readonly _user = signal<IUser | null>(JSON.parse(localStorage.getItem(USER)!));
  public user$ = this._user.asReadonly();
  public logged$ = computed<boolean>(() => !!this.user$());

  constructor() {}

  setUser(user: IUser) {
    this._user.set(user);
    localStorage.setItem(USER, JSON.stringify(user));
  }

  removeUser() {
    this._user.set(null);
    localStorage.removeItem(USER);
  }
}
