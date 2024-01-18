import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RoomsComponent } from './rooms.component';
import { AngularFireModulesMock, AngularFireProvidersMock } from 'src/app/shared/mocks/others';
import { RoomService } from 'src/app/services/room.service';
import { RoomServiceMock } from 'src/app/shared/mocks/service/room.service.spec';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RoomItemComponent } from './room-item/room-item.component';
import { RoomServiceProviderMock } from 'src/app/shared/mocks/service';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;
  let roomService: RoomService;
  let actions: DebugElement;
  let rooms: DebugElement;
  let modal: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RoomsComponent,
        RoomItemComponent,
        ModalComponent
      ],
      imports: [
        AngularFireModulesMock,
        RouterTestingModule
      ],
      providers: [
        AngularFireProvidersMock,
        RoomServiceProviderMock
      ]
    });
    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    roomService = TestBed.inject(RoomService);

    actions = fixture.debugElement.query(By.css('.actions'));
    rooms = fixture.debugElement.query(By.css('.rooms'));
    modal = fixture.debugElement.query(By.css('app-modal'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(actions).toBeTruthy();
    expect(rooms).toBeTruthy();
    expect(modal).toBeTruthy();
  });


  describe('on actions', () => {
    let header: HTMLElement;
    let button: HTMLButtonElement;
    beforeEach(() => {
      header = actions.nativeElement.querySelector('.rooms__header');
      button = actions.nativeElement.querySelector('button');
    });

    it('header should be "Escolha ou crie uma sala"', () => expect(header.innerText).toBe('Escolha ou crie uma sala'));
    it('button should be "Criar sala"', () => expect(button.innerText).toBe('Criar sala'));
    describe('on click button', () => {
      beforeEach(() => button.click());
      it('should open modal', () => expect(component.modal.isOpen$).toBeTrue());
    });
  });

  describe('on rooms', () => {
    let roomItemList: RoomItemComponent[];
    let noRoomLabel: HTMLElement;
    beforeEach(() => {
      roomItemList = rooms.nativeElement.querySelectorAll('app-room-item');
      noRoomLabel = rooms.nativeElement.querySelector('.no-room');
    });
    it('should have no rooms', () => expect(roomItemList.length).toBe(0));
    it('should have label no room', () => expect(noRoomLabel.innerText).toBe('Não há salas no momento!'));

    describe('on create room', () => {
      beforeEach(fakeAsync(() => {
        component.createRoom('Room name');
        tick(100);
        fixture.detectChanges();
        roomItemList = rooms.nativeElement.querySelectorAll('app-room-item');
        noRoomLabel = rooms.nativeElement.querySelector('.no-room');
      }))

      it('should have one room', () => expect(roomItemList.length).toBe(1));
      it('should not have label no room', () => expect(noRoomLabel).toBeFalsy());
    })
  });

  describe('on oppened modal', () => {
    let input: HTMLInputElement;
    let buttons: HTMLButtonElement[];
    beforeEach(() => {
      component.modal.open();
      fixture.detectChanges();
      modal = fixture.debugElement.query(By.css('app-modal'));
      input = modal.nativeElement.querySelector('input');
      buttons = modal.nativeElement.querySelectorAll('button');
    });

    it('should have title "Criar sala"', () => expect(component.modal.modalTitle).toBe('Criar sala'));
    it('should have input', () => expect(input).toBeTruthy());
    it('should have 2 buttons', () => expect(buttons.length).toBe(2));
    it('should have button "Criar"', () => expect(buttons[0].innerText).toBe('Criar'));
    it('should have button "Cancelar"', () => expect(buttons[1].innerText).toBe('Cancelar'));

    describe('on try to create room with a name', () => {
      let createRoomServiceSpy: jasmine.Spy;
      let modalCloseSpy: jasmine.Spy;
      beforeEach(fakeAsync(() => {
        createRoomServiceSpy = spyOn(roomService, 'createRoom');
        modalCloseSpy = spyOn(component.modal, 'close');
        input.value = 'Room name';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        buttons[0].click();
        tick(100);
      }));

      it('should call roomService.createRoom', () => expect(createRoomServiceSpy).toHaveBeenCalled());
      it('should call modal.close', () => expect(modalCloseSpy).toHaveBeenCalled());
    });

    describe('on try to create room without a name', () => {
      let createRoomServiceSpy: jasmine.Spy;
      let modalCloseSpy: jasmine.Spy;
      beforeEach(fakeAsync(() => {
        createRoomServiceSpy = spyOn(roomService, 'createRoom');
        modalCloseSpy = spyOn(component.modal, 'close');
        buttons[0].click();
        tick(100);
      }));

      it('should not call roomService.createRoom', () => expect(createRoomServiceSpy).not.toHaveBeenCalled());
      it('should not call modal.close', () => expect(modalCloseSpy).not.toHaveBeenCalled());
    });
  });
});
