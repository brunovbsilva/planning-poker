import { IVote } from "../interfaces/vote.interface";

export class Vote implements IVote {
  constructor(
    public readonly userId: string,
    public readonly userName: string,
    public value: number,
    public hidden: boolean = true,
  ) {}

  updateVote(vote: number): void {
    this.value = vote;
  }
  showVote(): void {
    this.hidden = false;
  }

}