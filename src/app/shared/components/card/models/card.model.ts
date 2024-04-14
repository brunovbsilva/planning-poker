import { ICard } from "../interfaces/card.interface";

export class Card implements ICard {
  constructor(
    public readonly value: string | number,
    public isFliped: boolean = false,
    public readonly creator?: string,
  ) {}

  toggleFlip(): void {
    this.isFliped = !this.isFliped;
  }
}