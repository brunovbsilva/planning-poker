import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomsComponent } from './rooms.component';
import { AngularFireModulesMock, AngularFireProvidersMock } from 'src/app/shared/mocks/others';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { RoomServiceProviderMock } from 'src/app/shared/mocks/service';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModulesMock, RoomsComponent, ModalComponent],
      providers: [AngularFireProvidersMock, RoomServiceProviderMock],
    });
    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
