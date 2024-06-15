import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AngularFireModulesMock, AngularFireProvidersMock } from 'src/app/shared/mocks/others';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [AngularFireModulesMock, LoginComponent],
    providers: [AngularFireProvidersMock]
});
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    let signInWithPopupSpy: jasmine.Spy;
    beforeEach(() => {
      signInWithPopupSpy = spyOn(component.auth, 'signInWithPopup').and.callThrough();
      component.login();
    });
    it('should call auth.signInWithPopup', () => expect(signInWithPopupSpy).toHaveBeenCalled());
  });
});
