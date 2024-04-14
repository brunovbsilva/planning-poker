export interface ICard {
  readonly value: string | number;
  readonly creator?: string;
  isFliped: boolean;

  toggleFlip(): void;
}