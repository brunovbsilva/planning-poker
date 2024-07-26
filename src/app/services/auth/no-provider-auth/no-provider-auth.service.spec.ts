import { TestBed } from '@angular/core/testing';

import { NoProviderAuthService } from './no-provider-auth.service';
import { UserService } from '../../user/user.service';
import { UserServiceMock } from '../../../shared/mocks/service/user.service.spec';
import { ErrorMessages } from '../../../shared/constants/error-messages';

fdescribe('NoProviderAuthService', () => {
  let service: NoProviderAuthService;
  let user: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: UserService, useClass: UserServiceMock }],
    });
    service = TestBed.inject(NoProviderAuthService);
    user = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    let setUserSpy: jasmine.Spy;
    beforeEach(() => {
      setUserSpy = spyOn(user, 'setUser');
    });
    it('should success', async () => {
      await service
        .login('mocked string')
        .catch(() => fail('expected success'))
        .finally(() => expect(setUserSpy).toHaveBeenCalled());
    });
    it('should throws an error', async () => {
      await service
        .login()
        .then(() => fail('expected error'))
        .catch(e => expect(e.message).toBe(ErrorMessages.UndefinedName))
        .finally(() => expect(setUserSpy).not.toHaveBeenCalled());
    });
  });

  describe('logout', () => {
    it('should remove user', () => {
      let removeUserSpy = spyOn(user, 'removeUser');
      service.logout();
      expect(removeUserSpy).toHaveBeenCalled();
    });
  });
});
