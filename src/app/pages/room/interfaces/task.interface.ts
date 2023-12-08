import { IVote } from "./vote.interface";

export interface ITask {
  name: string;
  votes: IVote[];

  vote(number: IVote): void;
  deleteVote(vote: IVote): void;
  showVotes(): void;
  revote(): void;
  getResult(): number;
}