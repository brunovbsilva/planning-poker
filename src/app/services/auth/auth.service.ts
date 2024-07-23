import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {User} from "./models/user.model";
import {IUser} from "./models/user.interface";
import {UserService} from "../user/user.service";
import {of, throwIfEmpty} from "rxjs";

const USER = 'logged-user';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthService {
  protected constructor(
    private userService: UserService
  ) {}

  async login(name?: string): Promise<void> {
    if(!name) throw new Error('name must be defined!');
    this.userService.setUser(new User(name));
  }

  logout(): void {
    this.userService.removeUser();
  }
}
