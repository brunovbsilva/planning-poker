import { TestBed } from '@angular/core/testing';

import { GoogleAuthService } from './google-auth.service';
import { UserService } from '../../user/user.service';
import { UserServiceMock } from '../../../shared/mocks/service/user.service.spec';
import { AngularFireModulesMock, AngularFireProvidersMock } from '../../../shared/mocks/others';
import { AngularFireAuth } from '@angular/fire/compat/auth';

fdescribe('GoogleAuthService', () => {
  let service: GoogleAuthService;
  let user: UserService;
  let auth: AngularFireAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModulesMock],
      providers: [{ provide: UserService, useClass: UserServiceMock }, AngularFireProvidersMock],
    });
    service = TestBed.inject(GoogleAuthService);
    user = TestBed.inject(UserService);
    auth = TestBed.inject(AngularFireAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    let setUserSpy: jasmine.Spy;
    let signInSpy: jasmine.Spy;
    beforeEach(() => {
      setUserSpy = spyOn(user, 'setUser');
      signInSpy = spyOn(auth, 'signInWithPopup');
    });
    it('should success', async () => {
      signInSpy.and.returnValue(Promise.resolve({}));
      await service
        .login()
        .catch(() => fail('expected success'))
        .then(() => expect(setUserSpy).toHaveBeenCalled());
    });
  });
});
