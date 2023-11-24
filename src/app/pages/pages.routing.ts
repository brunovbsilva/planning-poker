import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  {
    path: 'rooms',
    component: RoomsComponent
  },
  {
    path: 'room/:id',
    component: RoomComponent
  },
  { path: '**', redirectTo: 'rooms' }	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
