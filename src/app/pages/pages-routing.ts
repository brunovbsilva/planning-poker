import { Routes } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomComponent } from './room/room.component';
import { RoomNameResolver } from '../shared/resolvers/room-name.resolver';

export const routes: Routes = [
  { path: 'rooms', component: RoomsComponent, title: 'Salas' },
  { path: 'room/:id', component: RoomComponent, title: RoomNameResolver },
  { path: '**', redirectTo: 'rooms' }
];
