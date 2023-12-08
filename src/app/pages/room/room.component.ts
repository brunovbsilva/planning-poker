import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { IRoom } from './interfaces/room.interface';
import { Subscription } from 'rxjs';
import { Room } from './models/room';
import { Task } from './models/task';
import { Vote } from './models/vote';

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
      this.room = new Room(
        room.name,
        room.creator,
        room.tasks.map(task => new Task(
          task.name,
          task.votes.map(vote => new Vote(
            vote.userId,
            vote.userName,
            vote.value,
            vote.hidden
          ))
        )),
        room.currentTask,
        room.id
      );
    });
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
