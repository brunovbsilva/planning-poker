import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class NoProviderAuthService extends AuthService {
  constructor(private user: UserService) {
    super(user);
  }
}
