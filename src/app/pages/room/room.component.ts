import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { IRoom } from './interfaces/room.interface';
import { Room } from './models/room';
import { Task } from './models/task';
import { Vote } from './models/vote';
import { BaseComponent } from 'src/app/shared/components/base.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent extends BaseComponent implements OnInit {

  public roomId: string | null;
  public room?: IRoom;

  constructor(
    private activatedRoute: ActivatedRoute,
    private roomService: RoomService,
  ) {
    super();
    this.roomId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.startListenerRoom();
  }

  private startListenerRoom(): void {
    this.toDestroy(
      this.roomService.listenerRoom(this.roomId!)
        .subscribe(room => {
          if(this.room) this.room?.updateValues(room);
          else this.startRoom(room);
        })
    );
  };

  private startRoom(room: IRoom): void {
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
  }
}
