import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RoomsComponent } from './rooms.component';
import { AngularFireModulesMock, AngularFireProvidersMock } from 'src/app/shared/mocks/others';
import { RoomService } from 'src/app/services/room.service';
import { RoomServiceMock } from 'src/app/shared/mocks/service/room.service.spec';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;
  let roomService: RoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RoomsComponent,
        ModalComponent
      ],
      imports: [
        AngularFireModulesMock,
        RouterTestingModule
      ],
      providers: [
        AngularFireProvidersMock,
        { provide: RoomService, useClass: RoomServiceMock }
      ]
    });
    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;

    roomService = TestBed.inject(RoomService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on create room', () => {
    it('with a name should add on observable list', fakeAsync(() => {
      component.createRoom('Room name');
      tick(100);
      expect(component.rooms.length).toBe(1);
    }));
    it('with no name should not add on observable list', fakeAsync(() => {
      component.createRoom('');
      tick(100);
      expect(component.rooms.length).toBe(0);
    }));
  });
});
