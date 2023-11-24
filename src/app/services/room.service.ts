import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IRoom } from '../pages/rooms/interfaces/iroom';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private firestore: AngularFirestore) {}

  createRoom(room: IRoom) {
    this.firestore.collection<IRoom>('rooms').add(room);
  }

  updateRoom(room: IRoom) {
    this.firestore.doc<IRoom>('rooms/' + room.id).update(room);
  }

  deleteRoom(roomId: string) {
    this.firestore.doc<IRoom>('rooms/' + roomId).delete();
  }

  listenerRoom(roomId: string) {
    return this.firestore.doc<IRoom>('rooms/' + roomId).valueChanges()
      .pipe(map(room => Object.assign({ id: roomId }, room)));
  }

  getRooms() {
    return this.firestore.collection<IRoom>('rooms').snapshotChanges()
      .pipe(map(actions => actions.map(this.actionToRoomModel)));
  }

  private actionToRoomModel(action: any) {
    const data = action.payload.doc.data() as IRoom;
    const id = action.payload.doc.id;
    return Object.assign({ id: id }, data);
  }
}
