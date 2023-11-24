import { Component, Input, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { IRoom } from '../../rooms/interfaces/iroom';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  @Input() room!: IRoom;
  index = 0;

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {}

  nextTask() {
    this.room.currentTask++;
    this.roomService.updateRoom(this.room);
  }

  previousTask() {
    this.room.currentTask--;
    this.roomService.updateRoom(this.room);
  }

  getTask(): string {
    return this.room?.tasks[this.room.currentTask] || '';
  }

  addTask() {
    this.room.tasks.push('task ' + this.index);
    this.roomService.updateRoom(this.room);
    this.index++;
  }
}
