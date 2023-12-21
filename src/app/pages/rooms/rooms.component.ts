import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { IRoomItem } from './room-item/interfaces/room-item.inteface';
import { map } from 'rxjs';
import { RoomItem } from './room-item/models/room-item';
import { Router } from '@angular/router';
import { Room } from '../room/models/room';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IModal } from 'src/app/shared/components/modal/interfaces/modal.interface';
import { BaseComponent } from 'src/app/shared/components/base.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent extends BaseComponent implements OnInit {

  rooms: IRoomItem[] = [];
  @ViewChild('modal') modal!: IModal;

  constructor(
    private roomService: RoomService,
    private userAuth: AngularFireAuth,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.toDestroy(
      this.roomService.getRooms()
      .pipe(map(rooms => rooms.map(room => new RoomItem(room.id, room.name, this.roomService, this.router))))
      .subscribe({
        next: rooms => this.rooms = rooms,
        error: error => {throw(error)}
      })
    );
  }

  createRoom(name: string) {
    if(!name) return;
    this.userAuth.currentUser
      .then(user => this.roomService.createRoom(new Room(name, user?.uid!)))
      .finally(() => this.modal.close());
  }
}
