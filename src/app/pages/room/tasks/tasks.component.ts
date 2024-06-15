import { Component, Input, ViewChild } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { IRoom } from '../interfaces/room.interface';
import { ITask } from '../interfaces/task.interface';
import { IModal } from 'src/app/shared/components/modal/interfaces/modal.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainInputDirective } from '../../../shared/directives/main-input/main-input.directive';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { MainButtonDirective } from '../../../shared/directives/main-button/main-button.directive';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss'],
    standalone: true,
    imports: [MainButtonDirective, ModalComponent, FormsModule, MainInputDirective, ReactiveFormsModule]
})
export class TasksComponent {

  @Input() room!: IRoom;
  @ViewChild('modal') modal!: IModal;
  public createTaskForm = new FormControl('');

  constructor(private roomService: RoomService) { }

  nextTask() {
    this.room.nextTask();
    this.roomService.updateRoom(this.room);
  }

  previousTask() {
    this.room.previousTask();
    this.roomService.updateRoom(this.room);
  }

  setTask(index: number) {
    this.room.setTaskIndex(index);
    this.roomService.updateRoom(this.room);
  }

  createTask(name: string) {
    this.room.createTask(name);
    this.createTaskForm.reset();
    this.roomService.updateRoom(this.room);
  }

  deleteTask(task: ITask) {
    this.room.deleteTask(task);
    this.roomService.updateRoom(this.room);
  }
}
