export interface ICard {
  readonly value: string | number;
  readonly creator?: string;
  isFliped: boolean;
  highlight: boolean;

  toggleFlip(): void;
}
