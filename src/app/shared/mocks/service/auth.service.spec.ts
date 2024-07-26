import { AuthService } from '../../../services/auth/auth.service';

export class AuthServiceMock extends AuthService {
  public override async login(name?: string): Promise<void> {
    return Promise.resolve();
  }
  public override logout(): void {}
}
