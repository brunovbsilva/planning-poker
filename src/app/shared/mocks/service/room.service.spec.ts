import { BehaviorSubject, Observable, map } from "rxjs";
import { IRoom } from "src/app/pages/room/interfaces/room.interface";
import { IRoomItem } from "src/app/pages/rooms/room-item/interfaces/room-item.inteface";
import { RoomMock } from "../constants";
import { RoomItem } from "src/app/pages/rooms/room-item/models/room-item";

export class RoomServiceMock {
  private subject = new BehaviorSubject<IRoom>(RoomMock);
  private roomsSubject = new BehaviorSubject<IRoomItem[]>([]);
  createRoom(room: IRoom): void {
    let service: any;
    let router: any;
    this.roomsSubject.next([...this.roomsSubject.value, new RoomItem(room.id!, room.name, service, router)]);
  }
  updateRoom(room: IRoom): void {
    this.subject.next(room);
  }
  deleteRoom(id: string): void {
    this.roomsSubject.next(this.roomsSubject.value.filter(room => room.id !== id));
  }
  listenerRoom(id: string): Observable<IRoom> {
    return this.subject.asObservable();
  }
  getRooms(): Observable<IRoomItem[]> {
    return this.roomsSubject.asObservable();
  }
}