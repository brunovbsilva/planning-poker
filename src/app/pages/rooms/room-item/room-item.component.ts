import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRoom } from '../../room/interfaces/room.interface';
import { IRoomItem } from './interfaces/room-item.inteface';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent {
  @Input() room!: IRoomItem;
}
