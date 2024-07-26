import { IUser } from '../../../services/auth/models/user.interface';
import { UserService } from '../../../services/user/user.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceMock extends UserService {
  public override setUser(user: IUser) {
    this._user.set(user);
  }

  public override removeUser() {
    this._user.set(null);
  }
}
