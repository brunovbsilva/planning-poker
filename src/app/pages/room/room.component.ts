import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { IRoom } from './interfaces/room.interface';
import { Room } from './models/room';
import { Task } from './models/task';
import { Vote } from './models/vote';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { VotesComponent } from './votes/votes.component';
import { TasksComponent } from './tasks/tasks.component';
import {JsonPipe} from "@angular/common";

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss'],
    standalone: true,
    imports: [
      TasksComponent,
      VotesComponent,
      JsonPipe
    ]
})
export class RoomComponent extends BaseComponent implements OnInit {

  public roomId: string | null;
  public $room = signal<IRoom | undefined>(this.startRoom(undefined));
  public currentTask = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private roomService: RoomService,
  ) {
    super();
    this.roomId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.toDestroy(
      this.roomService
        .listenerRoom(this.roomId!)
        .subscribe(value => this.$room.update(room => {
          if(room) room.updateValues(value);
          else room = this.startRoom(value);
          if(this.currentTask >= (room?.tasks?.length ?? 0)) this.currentTask = 0;
          return room;
        }))
    );
  }

  private startRoom(room: IRoom | undefined): IRoom | undefined {
    if(!room) return undefined;
    return new Room(
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
      room.id
    );
  }
}
