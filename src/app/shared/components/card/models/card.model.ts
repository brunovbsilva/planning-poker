import { ICard } from "./card.interface";

export class Card implements ICard {
  public highlight: boolean = false;
  constructor(
    public readonly value: string | number,
    public isFliped: boolean = false,
    public readonly creator?: string,
  ) {}

  toggleFlip(): void {
    this.isFliped = !this.isFliped;
  }
}
