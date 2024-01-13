import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomComponent } from './room/room.component';
import { RoomNameResolver } from '../shared/resolvers/room-name.resolver';

const routes: Routes = [
  {
    path: 'rooms',
    component: RoomsComponent,
    title: 'Salas'
  },
  {
    path: 'room/:id',
    component: RoomComponent,
    title: RoomNameResolver
  },
  { path: '**', redirectTo: 'rooms' }	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
