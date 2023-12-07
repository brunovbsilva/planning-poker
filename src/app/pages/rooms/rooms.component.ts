import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { IRoomItem } from './room-item/interfaces/room-item.inteface';
import { map } from 'rxjs';
import { RoomItem } from './room-item/models/room-item';
import { Router } from '@angular/router';
import { Room } from '../room/models/room';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  rooms: IRoomItem[] = [];

  constructor(
    private roomService: RoomService,
    private userAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roomService.getRooms()
      .pipe(
        map(rooms => rooms.map(room => new RoomItem(room.id, room.name, this.roomService, this.router)))
      )
      .subscribe({
        next: rooms => this.rooms = rooms,
        error: error => {throw(error)}
      })
  }

  createRoom(name: string) {
    this.userAuth.user.subscribe(user => {
      const room = new Room(name, user?.uid!);
      console.log(room);
      this.roomService.createRoom(room);
    });
  }
}
