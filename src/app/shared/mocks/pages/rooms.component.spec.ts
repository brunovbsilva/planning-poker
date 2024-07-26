import { Component, ViewChild } from '@angular/core';
import { IModal } from '../../components/modal/interfaces/modal.interface';
import { IRoomItem } from 'src/app/pages/rooms/models/room-item.inteface';

@Component({ selector: 'app-rooms', template: '' })
export class RoomsComponentSpec {
  rooms: IRoomItem[] = [];
  @ViewChild('modal') modal!: IModal;
}
