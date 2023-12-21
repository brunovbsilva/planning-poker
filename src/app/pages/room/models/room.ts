import { IRoom } from "../interfaces/room.interface";
import { ITask } from "../interfaces/task.interface";
import { Task } from "./task";
import { Vote } from "./vote";

export class Room implements IRoom {

  private _name: string;
  public get name(): string {
    return this._name;
  }

  private _creator: string;
  public get creator(): string {
    return this._creator;
  }

  constructor(
    name: string,
    creator: string,
    public tasks: ITask[] = [],
    public currentTask: number = 0,
    public readonly id?: string,
  ) {
    this._name = name;
    this._creator = creator;
  }

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

  updateValues(room: IRoom): void {
    this.updateName(room.name);
    this.updateCreator(room.creator);
    this.updateTasks(room.tasks);
    this.updateCurrentTask(room.currentTask);
  }

  private updateName(name: string): void {
    if(this._name === name || !name) return;
    this._name = name;
  }

  private updateCreator(creator: string): void {
    if(this._creator === creator || !creator) return;
    this._creator = creator;
  }

  private updateTasks(tasksToUpdate: ITask[]): void {
    if(this.tasks === tasksToUpdate) return;
    if(tasksToUpdate.length === 0) this.tasks = [];
    else tasksToUpdate.forEach((task: ITask) => {
      let currentTask = this.tasks.find(x => x.name === task.name);
      if(currentTask) currentTask.updateValues(task);
      else this.tasks.push(new Task(
        task.name,
        task.votes.map(vote => new Vote(
          vote.userId,
          vote.userName,
          vote.value,
          vote.hidden
        ))
      ));
    });
  }

  private updateCurrentTask(currentTask: number): void {
    if(this.currentTask === currentTask) return;
    this.currentTask = currentTask;
  }
}