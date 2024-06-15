import {Component, EventEmitter, Input, model, Output, ViewChild, WritableSignal} from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { IRoom } from '../interfaces/room.interface';
import { ITask } from '../interfaces/task.interface';
import { IModal } from 'src/app/shared/components/modal/interfaces/modal.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  @Input() currentTask!: number;
  @Output() currentTaskChange = new EventEmitter<number>();

  constructor(private roomService: RoomService) { }

  nextTask() {
    this.currentTask = (this.currentTask + 1) % this.room.tasks.length;
    this.currentTaskChange.emit(this.currentTask);
  }

  previousTask() {
    this.currentTask = (this.currentTask - 1) % this.room.tasks.length;
    this.currentTaskChange.emit(this.currentTask);
  }

  setTask(index: number) {
    this.currentTask = index;
    this.currentTaskChange.emit(this.currentTask);
  }

  async createTask(name: string) {
    const tasks = name.split('\n').map(name => name.trim());
    tasks.forEach(task => this.room.createTask(task));
    this.createTaskForm.reset();
    await this.roomService.updateRoom(this.room);
  }

  async deleteTask(task: ITask) {
    this.room.deleteTask(task);
    await this.roomService.updateRoom(this.room);
  }
}
