import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms/rooms.component';
import { PagesRoutingModule } from './pages.routing';
import { RoomComponent } from './room/room.component';
import { RoomItemComponent } from './rooms/room-item/room-item.component';
import { TasksComponent } from './room/tasks/tasks.component';
import { VotesComponent } from './room/votes/votes.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalVoteItemComponent } from "./room/votes/modal-vote-item/modal-vote-item.component";

@NgModule({
  declarations: [
    RoomsComponent,
    RoomComponent,
    RoomItemComponent,
    TasksComponent,
    VotesComponent,
    ModalVoteItemComponent
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule {}
