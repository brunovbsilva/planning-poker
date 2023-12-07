import { ITask } from "../interfaces/task.interface";
import { IVote } from "../interfaces/vote.interface";
import { Vote } from "./vote";

export class Task implements ITask {

  constructor(
    public name: string,
    public votes: IVote[] = [new Vote('unknown', 'unknown', 1)]
  ) {}
  
  
  vote(vote: IVote): void {
    this.votes.push(vote);
  }
  deleteVote(vote: IVote): void {
    this.votes = this.votes.filter(v => v !== vote);
  }
  showVotes(): void {
    this.votes.forEach((vote: IVote) => vote.showVote());
  }
  revote(): void {
    this.votes = [];
  }

}