import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { map } from "rxjs";
import { IRoom } from "src/app/pages/room/interfaces/room.interface";
import { RoomService } from "src/app/services/room.service";

@Injectable({providedIn: 'root'})
export class RoomNameResolver {
  constructor(private roomService: RoomService) { }
  resolve(route: ActivatedRouteSnapshot) {
    const roomId = route.paramMap.get('id');
    return this.roomService.listenerRoom(roomId!)
      .pipe(map((room: IRoom) => room.name));
  }
}