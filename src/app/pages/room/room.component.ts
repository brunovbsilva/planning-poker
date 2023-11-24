import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { IRoom } from '../rooms/interfaces/iroom';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  public roomId: string | null;
  public room?: IRoom;
  private subscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private roomService: RoomService,
  ) {
    this.roomId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.subscription = this.roomService.listenerRoom(this.roomId!).subscribe(room => {
      this.room = room;
    });
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
