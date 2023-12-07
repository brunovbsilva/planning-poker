import { IRoom } from "../interfaces/room.interface";
import { ITask } from "../interfaces/task.interface";
import { Task } from "./task";

export class Room implements IRoom {
  constructor(
    public readonly name: string,
    public readonly creator: string,
    public tasks: ITask[] = [],
    public currentTask: number = 0,
    public readonly id?: string,
  ) {}

  createTask(name: string): void {
    this.tasks.push(new Task(name));
  }
  nextTask(): void {
    this.currentTask == this.tasks.length - 1 ? 0 : this.currentTask++;
  }
  previousTask(): void {
    this.currentTask == 0 ? this.tasks.length - 1 : this.currentTask--;
  }
  deleteTask(task: ITask): void {
    this.tasks = this.tasks.filter(taskItem => taskItem !== task);
    this.setTaskIndex(0);
  }
  setTaskIndex(index: number): void {
    this.currentTask = index;
  }
}