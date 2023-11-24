import { IRoom } from "../interfaces/iroom";

export class Room implements IRoom {

  public readonly id?: string;
  public tasks: string[] = [];
  public currentTask: number = 0;

  constructor(
    public readonly name: string
  ) {}

}