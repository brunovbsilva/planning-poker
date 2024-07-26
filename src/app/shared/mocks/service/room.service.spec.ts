import { BehaviorSubject } from 'rxjs';
import { IRoom } from 'src/app/pages/room/interfaces/room.interface';
import { RoomMock } from '../constants';

export class RoomServiceMock {
  private subject = new BehaviorSubject<IRoom>(RoomMock);
  // private roomsSubject = new BehaviorSubject<IRoomItem[]>([]);
  // createRoom(room: IRoom): void {
  //   let service: any;
  //   let router: any;
  //   this.roomsSubject.next([...this.roomsSubject.value, new RoomItem(room.id!, room.name)]);
  // }
  updateRoom(room: IRoom): void {
    this.subject.next(room);
  }
  // deleteRoom(id: string): void {
  //   this.roomsSubject.next(this.roomsSubject.value.filter(room => room.id !== id));
  // }
  // listenerRoom(id: string): Observable<IRoom> {
  //   return this.subject.asObservable();
  // }
  // getRooms(): Observable<IRoomItem[]> {
  //   return this.roomsSubject.asObservable();
  // }
  // getRoomById(roomId: string): Observable<IRoomItem | undefined> {
  //   return of(RoomItemMock);
  // }
}
