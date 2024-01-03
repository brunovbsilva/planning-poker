import { BehaviorSubject, Observable, Subject, of } from "rxjs";
import { IRoom } from "src/app/pages/room/interfaces/room.interface";
import { Room } from "src/app/pages/room/models/room";
import { Task } from "src/app/pages/room/models/task";
import { Vote } from "src/app/pages/room/models/vote";
import { IRoomItem } from "src/app/pages/rooms/room-item/interfaces/room-item.inteface";

const room = new Room(
  'mocked room',
  'mocked creator',
  [new Task(
    'mocked task',
    [new Vote('mocked user id', 'mocked user name', 10)]
  )],
  0,
  'mocked id'
);

export class RoomServiceMock {
  private subject = new BehaviorSubject<IRoom>(room);
  createRoom(room: IRoom): void { }
  updateRoom(room: IRoom): void {
    this.subject.next(room);
  }
  deleteRoom(id: string): void { }
  listenerRoom(id: string): Observable<IRoom> {
    return this.subject.asObservable();
  }
  getRooms(): Observable<IRoomItem[]> {
    return of([]);
  }
}