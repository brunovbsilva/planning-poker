import { ITask } from "../interfaces/task.interface";
import { IVote } from "../interfaces/vote.interface";
import { Vote } from "./vote";

export class Task implements ITask {

  constructor(
    public name: string,
    public votes: IVote[] = []
  ) {}
  
  vote(vote: IVote): void {
    this.votes = this.votes.filter(v => v.userId !== vote.userId);
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
  getResult(): number {
    const numberVotes = this.votes.filter(vote => Number(vote.value) > 0);
    const length = numberVotes.length;
    return Math.round(
      numberVotes.reduce((acc, vote) => acc + Number(vote.value)/length, 0)
    );
  }

  updateValues(task: ITask): void {
    this.updateName(task.name);
    this.updateVotes(task.votes);
  }

  private updateName(name: string): void {
    if(this.name === name || !name) return;
    this.name = name;
  }

  private updateVotes(votes: IVote[]): void {
    if(this.votes === votes) return;
    if(votes.length === 0) this.votes = [];
    else votes.forEach((vote: IVote) => {
      const currentVote = this.votes.find(x => x.userId === vote.userId);
      if(currentVote) currentVote.updateValues(vote);
      else this.pushVote(vote);
      this.votes = this.votes.filter(x => votes.map(v => v.userId).includes(x.userId));
    });
  }

  private pushVote(vote: IVote): void {
    this.votes.push(new Vote(
      vote.userId,
      vote.userName,
      vote.value,
      vote.hidden
    ));
  }

}