export interface IRoom {
  readonly id?: string;
  readonly name: string;
  tasks: string[];
  currentTask: number;
}