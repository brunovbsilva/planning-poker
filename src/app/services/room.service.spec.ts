import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RoomService } from './room.service';
import { AngularFireModulesMock, AngularFireProvidersMock } from '../shared/mocks/others';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Room } from '../pages/room/models/room';
import { Task } from '../pages/room/models/task';
import { Vote } from '../pages/room/models/vote';
import { Observable } from 'rxjs';
import { IRoom } from '../pages/room/interfaces/room.interface';
import { IRoomItem } from '../pages/rooms/room-item/interfaces/room-item.inteface';

describe('RoomService', () => {
  let service: RoomService;
  let firestore: AngularFirestore;
  const roomMock = new Room(
    'mocked room',
    'mocked creator',
    [new Task(
      'mocked task',
      [new Vote('mocked user id', 'mocked user name', 10)]
    )],
    0,
    'mocked id'
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModulesMock],
      providers: [
        AngularFireProvidersMock
      ]
    });
    service = TestBed.inject(RoomService);
    firestore = TestBed.inject(AngularFirestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createRoom', () => {
    let firestoreCreateSpy: jasmine.Spy;
    beforeEach(() => {
      firestoreCreateSpy = spyOn(firestore, 'collection').and.callThrough();
      service.createRoom(roomMock);
    });

    it('should call firestore.collection(\'rooms\').add', () => expect(firestoreCreateSpy).toHaveBeenCalled());
  });

  describe('updateRoom', () => {
    let firestoreUpdateSpy: jasmine.Spy;
    beforeEach(() => {
      firestoreUpdateSpy = spyOn(firestore, 'doc').and.callThrough();
      service.updateRoom(roomMock);
    });

    it('should call firestore.doc(\'rooms/\'+room.id).update', () => expect(firestoreUpdateSpy).toHaveBeenCalled());
  });

  describe('deleteRoom', () => {
    let firestoreDeleteSpy: jasmine.Spy;
    beforeEach(() => {
      firestoreDeleteSpy = spyOn(firestore, 'doc').and.callThrough();
      service.deleteRoom(roomMock.id!);
    });

    it('should call firestore.doc(\'rooms/\'+roomId).delete', () => expect(firestoreDeleteSpy).toHaveBeenCalled());
  });

  describe('listenerRoom', () => {
    let observer: Observable<IRoom>;
    beforeEach(() => observer = service.listenerRoom(roomMock.id!));

    it('should get observable', () => expect(observer).toBeTruthy());
    it('should get a room', fakeAsync(() => {
      observer.subscribe(r => expect(r).toBeInstanceOf(Object));
      service.updateRoom(roomMock);
      tick();
    }));
  });

  describe('getRooms', () => {
    let observer: Observable<IRoomItem[]>;
    beforeEach(() => observer = service.getRooms());

    it('should get observable', () => expect(observer).toBeTruthy());
    it('should get a room', fakeAsync(() => {
      observer.subscribe(r => expect(r).toBeInstanceOf(Array<IRoomItem>));
      service.createRoom(roomMock);
      tick();
    }));
  });
  
});
