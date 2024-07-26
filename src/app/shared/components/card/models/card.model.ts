import {ICard} from './card.interface';

export class Card implements ICard {
  constructor(
    public readonly value: string | number,
    public isFliped = false,
    public readonly creator?: string,
    public highlight = false
  ) {}

  toggleFlip(): void {
    this.isFliped = !this.isFliped;
  }
}
