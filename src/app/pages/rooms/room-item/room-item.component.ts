import { Component, Input } from '@angular/core';
import { IRoomItem } from './interfaces/room-item.inteface';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent {
  @Input() room!: IRoomItem;
}
