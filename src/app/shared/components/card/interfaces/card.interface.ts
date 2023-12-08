import { CardType } from "../models/card-type.enum";

export interface ICard {
  readonly type: CardType;
  readonly value: number;
  readonly creator?: string;
  isFliped: boolean;

  toggleFlip(): void;
}