import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomService } from '../../services/room/room.service';
import { IRoomItem } from './models/room-item.inteface';
import { RoomItem } from './models/room-item';
import { Router } from '@angular/router';
import { Room } from '../room/models/room';
import { IModal } from 'src/app/shared/components/modal/interfaces/modal.interface';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { MainInputDirective } from '../../shared/directives/main-input/main-input.directive';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { MainButtonDirective } from '../../shared/directives/main-button/main-button.directive';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";

@Component({
    selector: 'app-rooms',
    templateUrl: './rooms.component.html',
    styleUrls: ['./rooms.component.scss'],
    standalone: true,
    imports: [MainButtonDirective, ModalComponent, MainInputDirective, FormsModule, ReactiveFormsModule]
})
export class RoomsComponent extends BaseComponent implements OnInit {

  rooms: IRoomItem[] = [];
  @ViewChild('modal') modal!: IModal;
  enterForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required)
  });
  createForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });

  constructor(
    private roomService: RoomService,
    private userService: UserService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.toDestroy(
      this.roomService.getRooms()
        .subscribe({
          next: rooms => this.rooms = rooms,
          error: error => {throw(error)}
        })
    );
  }

  async createRoom(name: string) {
    if(this.isNullOrEmpty(name)) return;
    await this.roomService
      .createRoom(new Room(name, this.userService.user$()!.id))
      .then(reference => reference.get())
      .then(snapshot => new RoomItem(snapshot.id, snapshot.data()!.name))
      .then(room => this.goToPath(room.getPath()));
  }

  private isNullOrEmpty(value: string | null | undefined): boolean {
    return value === null || value === undefined || value === '';
  }

  async enterRoom() {
    this.toDestroy(
      this.roomService.getRoomById(this.enterForm.get('id')?.value)
        .subscribe(async room => {
          if(room) await this.goToPath(room.getPath());
        })
    )
  }

  private async goToPath(path: string[]) {
    await this.router.navigate(path)
  }
}
