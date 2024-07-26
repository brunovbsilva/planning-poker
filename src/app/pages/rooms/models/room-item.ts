import { IRoomItem } from './room-item.inteface';

export class RoomItem implements IRoomItem {
  constructor(
    readonly id: string,
    readonly name: string
  ) {}

  getPath(): string[] {
    return ['room', this.id];
  }
}
