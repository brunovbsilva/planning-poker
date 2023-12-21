export interface IVote {
  readonly userId: string;
  readonly userName: string;
  value: number;
  hidden: boolean;

  updateVote(vote: number): void;
  showVote(): void;
  updateValues(vote: IVote): void;
}