import { ICard } from "../interfaces/card.interface";
import { CardType } from "./card-type.enum";

export class Card implements ICard {

  

  constructor(
    public readonly type: CardType,
    public readonly value: number,
    public isFliped: boolean = false,
    public readonly creator?: string,
  ) {}

  toggleFlip(): void {
    this.isFliped = !this.isFliped;
  }
}