import { Component, Input, ViewChild } from '@angular/core';
import { IRoom } from 'src/app/pages/room/interfaces/room.interface';
import { IModal } from '../../components/modal/interfaces/modal.interface';

@Component({ selector: 'app-tasks', template: '' })
export class TasksComponentSpec {
  @Input() room!: IRoom;
  @ViewChild('modal') modal!: IModal;
}
