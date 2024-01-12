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
  updateValues(vote: IVote): void {
    this.updateCurrentVote(vote.value);
    this.updateHidden(vote.hidden);
  }

  private updateHidden(hidden: boolean): void {
    if(this.hidden === hidden) return;
    this.hidden = hidden;
  }

  private updateCurrentVote(vote: number): void {
    if(this.value === vote) return;
    this.value = vote;
  }

}