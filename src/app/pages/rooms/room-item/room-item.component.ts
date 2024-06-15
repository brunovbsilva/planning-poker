import { Component, Input } from '@angular/core';
import { IRoomItem } from './interfaces/room-item.inteface';
import { MainButtonDirective } from '../../../shared/directives/main-button/main-button.directive';

@Component({
    selector: 'app-room-item',
    templateUrl: './room-item.component.html',
    styleUrls: ['./room-item.component.scss'],
    standalone: true,
    imports: [MainButtonDirective]
})
export class RoomItemComponent {
  @Input() room!: IRoomItem;
}
