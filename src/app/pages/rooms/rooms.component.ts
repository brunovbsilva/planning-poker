import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RoomService } from '../../services/room.service';
import { Room } from './models/room';
import { IRoom } from './interfaces/iroom';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  rooms: IRoom[] = [];

  constructor(
    private roomService: RoomService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roomService.getRooms().subscribe({
      next: rooms => this.rooms = rooms,
      error: error => console.log(error)
    })
  }

  createRoom(name: string) {
    this.roomService.createRoom({name: name, tasks: [], currentTask: 0});
  }

  deleteRoom(id: string) {
    console.log(id);
    this.roomService.deleteRoom(id);
  }

  joinRoom(id: string) {
    this.router.navigate(['room', id]);
  }
}
