import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms/rooms.component';
import { PagesRoutingModule } from './pages.routing';
import { RoomComponent } from './room/room.component';
import { RoomItemComponent } from './rooms/room-item/room-item.component';
import { TasksComponent } from './room/tasks/tasks.component';
import { VotesComponent } from './room/votes/votes.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RoomsComponent,
    RoomComponent,
    RoomItemComponent,
    TasksComponent,
    VotesComponent
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule
  ]
})
export class PagesModule {}
