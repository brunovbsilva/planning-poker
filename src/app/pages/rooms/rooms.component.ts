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
import { MainInputDirective } from '../../shared/directives/main-input/main-input.directive';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { RoomItemComponent } from './room-item/room-item.component';
import { MainButtonDirective } from '../../shared/directives/main-button/main-button.directive';

@Component({
    selector: 'app-rooms',
    templateUrl: './rooms.component.html',
    styleUrls: ['./rooms.component.scss'],
    standalone: true,
    imports: [MainButtonDirective, RoomItemComponent, ModalComponent, MainInputDirective]
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

  async createRoom(name: string) {
    if(this.isNullOrEmpty(name)) return;
    this.userAuth.currentUser
      .then(async user => await this.roomService.createRoom(new Room(name, user?.uid!)))
      .finally(() => this.modal.close());
  }

  private isNullOrEmpty(value: string | null | undefined): boolean {
    return value === null || value === undefined || value === '';
  }
}
