import { Component, Input } from '@angular/core';
import { IRoomItem } from 'src/app/pages/rooms/room-item/interfaces/room-item.inteface';

@Component({ selector: 'app-room-item', template: '' })
export class RoomItemComponentSpec {
  @Input() room!: IRoomItem;
}
