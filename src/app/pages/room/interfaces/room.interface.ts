import { ITask } from "./task.interface";

export interface IRoom {
  readonly id?: string;
  readonly name: string;
  readonly creator: string;
  tasks: ITask[];

  createTask(name: string): void;
  deleteTask(task: ITask): void;
  updateValues(room: IRoom): void;
}
