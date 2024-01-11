import { Component } from '@angular/core';
import { IRoom } from 'src/app/pages/room/interfaces/room.interface';

@Component({ selector: 'app-room', template: '' })
export class RoomComponentSpec {
  public roomId: string | null = '';
  public room?: IRoom;
}
