import { IRoomItem } from "../interfaces/room-item.inteface";
import { RoomService } from "src/app/services/room.service";
import { Router } from "@angular/router";

export class RoomItem implements IRoomItem {
  
  constructor(
    readonly id: string,
    readonly name: string,
    private roomService: RoomService,
    private router: Router
  ) {}

  delete() {
    this.roomService.deleteRoom(this.id);
  }

  join() {
    this.router.navigate(['room', this.id]);
  }
}