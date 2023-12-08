import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { IRoom } from '../interfaces/room.interface';
import { ITask } from '../interfaces/task.interface';
import { IModal } from 'src/app/shared/components/modal/interfaces/modal.interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  @Input() room!: IRoom;
  @ViewChild('modal') modal!: IModal;

  constructor(private roomService: RoomService) { }

  ngOnInit(): void { }

  nextTask() {
    this.room.nextTask();
    this.roomService.updateRoom(this.room);
  }

  previousTask() {
    this.room.previousTask();
    this.roomService.updateRoom(this.room);
  }

  createTask(name: string) {
    this.room.createTask(name);
    this.roomService.updateRoom(this.room);
  }

  deleteTask(task: ITask) {
    this.room.deleteTask(task);
    this.roomService.updateRoom(this.room);
  }
}
