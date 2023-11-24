import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRoom } from '../interfaces/iroom';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent {
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output() onJoin: EventEmitter<string> = new EventEmitter<string>();
  @Input() room!: IRoom;

  deleteRoom() {
    this.onDelete.emit(this.room.id);
  }

  joinRoom() {
    this.onJoin.emit(this.room.id);
  }
}
