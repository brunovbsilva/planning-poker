import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { UserService } from '../user/user.service';
import { ErrorMessages } from '../../shared/constants/error-messages';

@Injectable({
  providedIn: 'root',
})
export abstract class AuthService {
  protected constructor(private userService: UserService) {}

  async login(name?: string): Promise<void> {
    if (!name) throw new Error(ErrorMessages.UndefinedName);
    this.userService.setUser(new User(name));
  }

  logout(): void {
    this.userService.removeUser();
  }
}
