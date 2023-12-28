import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModulesMock, AngularFireProvidersMock } from 'src/app/shared/mocks/others';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let router: Router;
  let auth: AngularFireAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      imports: [
        RouterTestingModule,
        AngularFireModulesMock
      ],
      providers: [
        AngularFireProvidersMock
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    auth = TestBed.inject(AngularFireAuth);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on logout', () => {
    let authSpy: jasmine.Spy;
    let routerSpy: jasmine.Spy;

    beforeEach(fakeAsync(() => {
      authSpy = spyOn(auth, 'signOut').and.returnValue(Promise.resolve());
      routerSpy = spyOn(router, 'navigate');
      component.logout();
      tick(100);
    }));

    it('should call signOut', () => expect(authSpy).toHaveBeenCalled());
    it('should call navigate', () => expect(routerSpy).toHaveBeenCalledWith(['']));
  });
});
