import { ICard } from "./card.interface";

export class Card implements ICard {
  constructor(
    public readonly value: string | number,
    public isFliped: boolean = false,
    public readonly creator?: string,
    public highlight: boolean = false,
  ) {}

  toggleFlip(): void {
    this.isFliped = !this.isFliped;
  }
}
