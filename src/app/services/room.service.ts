import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IRoom } from '../pages/room/interfaces/room.interface';
import { map } from 'rxjs';
import { IRoomItem } from '../pages/rooms/room-item/interfaces/room-item.inteface';
import { ITask } from '../pages/room/interfaces/task.interface';
import { IVote } from '../pages/room/interfaces/vote.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private firestore: AngularFirestore) {}

  createRoom(room: IRoom) {
    this.firestore.collection<IRoom>('rooms').add(this.roomObjectModel(room));
  }

  updateRoom(room: IRoom) {
    this.firestore.doc<IRoom>('rooms/' + room.id).update(this.roomObjectModel(room));
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
    const data = action.payload.doc.data() as IRoomItem;
    const id = action.payload.doc.id;
    return Object.assign({ id: id }, data);
  }

  private roomObjectModel(room: IRoom) {
    return Object.assign({ 
      name: room.name,
      creator: room.creator,
      tasks: room.tasks.map(task => this.taskObjectModel(task)),
      currentTask: room.currentTask 
    });
  }
  private taskObjectModel(task: ITask) {
    return Object.assign({
      name: task.name,
      votes: task.votes.map(vote => this.voteObjectModel(vote))
    });
  }
  private voteObjectModel(vote: IVote) {
    return Object.assign({
      userId: vote.userId,
      userName: vote.userName,
      value: vote.value,
      hidden: vote.hidden
    });
  }
}
