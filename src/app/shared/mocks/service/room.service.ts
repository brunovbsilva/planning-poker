import { BehaviorSubject, Observable, of } from "rxjs";
import { IRoom } from "src/app/pages/room/interfaces/room.interface";
import { IRoomItem } from "src/app/pages/rooms/room-item/interfaces/room-item.inteface";
import { RoomMock } from "../constants";

export class RoomServiceMock {
  private subject = new BehaviorSubject<IRoom>(RoomMock);
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