import { AuthService } from '../../../services/auth/auth.service';

export class AuthServiceMock extends AuthService {
  public override async login(): Promise<void> {
    return Promise.resolve();
  }
  public override logout(): void {}
}
