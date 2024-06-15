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
    public readonly id?: string,
  ) {
    this._name = name;
    this._creator = creator;
  }

  createTask(name: string): void {
    this.tasks.push(new Task(name));
  }
  deleteTask(task: ITask): void {
    this.tasks = this.tasks.filter(taskItem => taskItem !== task);
  }

  updateValues(room: IRoom): void {
    this.updateName(room.name);
    this.updateCreator(room.creator);
    this.updateTasks(room.tasks);
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
      const currentTask = this.tasks.find(x => x.name === task.name);
      if(currentTask) currentTask.updateValues(task);
      else this.pushTask(task);
      this.tasks = this.tasks.filter(x => tasksToUpdate.map(x => x.name).includes(x.name));
    });
  }

  private pushTask(task: ITask): void {
    this.tasks.push(new Task(
      task.name,
      task.votes.map(vote => new Vote(
        vote.userId,
        vote.userName,
        vote.value,
        vote.hidden
      ))
    ));
  }
}
