import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomItemComponent } from './room-item.component';
import { RoomService } from 'src/app/services/room.service';
import { RoomItem } from './models/room-item';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { RoomItemMock } from 'src/app/shared/mocks/constants';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModulesMock, AngularFireProvidersMock } from 'src/app/shared/mocks/others';
import { RoomServiceProviderMock } from 'src/app/shared/mocks/service';

describe('RoomItemComponent', () => {
  let component: RoomItemComponent;
  let fixture: ComponentFixture<RoomItemComponent>;
  let roomService: RoomService;
  let router: Router;
  let room: DebugElement;
  let firestore: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomItemComponent ],
      imports: [ 
        RouterTestingModule,
        AngularFireModulesMock
      ],
      providers: [
        RoomServiceProviderMock,
        AngularFireProvidersMock
      ]
    });
    fixture = TestBed.createComponent(RoomItemComponent);
    component = fixture.componentInstance;
    roomService = TestBed.inject(RoomService);
    router = TestBed.inject(Router);
    firestore = TestBed.inject(AngularFirestore);
    component.room = new RoomItem(RoomItemMock.id, RoomItemMock.name, roomService, router);
    room = fixture.debugElement.query(By.css('.room'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(room).toBeTruthy();
  });

  describe('on room', () => {
    let name: HTMLElement;
    let buttons: HTMLButtonElement[];
    beforeEach(() => {
      name = room.nativeElement.querySelector('.room__name');
      buttons = room.nativeElement.querySelectorAll('button');
    });

    it('should display room name', () => expect(name.innerText).toContain(component.room.name));
    it('should display 2 buttons', () => expect(buttons.length).toBe(2));
    it('should display enter button', () => expect(buttons[0].innerText).toContain('Entrar'));
    it('should display delete button', () => expect(buttons[1].innerText).toContain('Deletar'));

    describe('on enter button click', () => {
      let enterSpy: jasmine.Spy;
      let routerSpy: jasmine.Spy;
      beforeEach(() => {
        enterSpy = spyOn(component.room, 'join').and.callThrough();
        routerSpy = spyOn(router, 'navigate').and.callThrough();
        buttons[0].click();
      });

      it('should call enter method', () => expect(enterSpy).toHaveBeenCalled());
      it('should call router navigate method', () => expect(routerSpy).toHaveBeenCalledWith(['room', component.room.id]));
    });

    describe('on delete button click', () => {
      let deleteSpy: jasmine.Spy;
      let deleteRoomSpy: jasmine.Spy;
      beforeEach(() => {
        deleteSpy = spyOn(component.room, 'delete').and.callThrough();
        deleteRoomSpy = spyOn(roomService, 'deleteRoom').and.callThrough();
        buttons[1].click();
      });

      it('should call delete method', () => expect(deleteSpy).toHaveBeenCalled());
      it('should call deleteRoom method', () => expect(deleteRoomSpy).toHaveBeenCalledWith(component.room.id));
    });
  });
});
