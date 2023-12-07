import { ITask } from "./task.interface";

export interface IRoom {
  readonly id?: string;
  readonly name: string;
  readonly creator: string;
  tasks: ITask[];
  currentTask: number;

  createTask(name: string): void;
  nextTask(): void;
  previousTask(): void;
  deleteTask(task: ITask): void;
  setTaskIndex(index: number): void;
}