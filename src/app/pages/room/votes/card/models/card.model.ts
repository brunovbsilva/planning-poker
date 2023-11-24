import { Card } from "../interfaces/card.interface";
import { CardType } from "./card-type.enum";

export class CardModel implements Card {

  public readonly type: CardType;
  public isFliped: boolean = false;

  constructor(
    public readonly cardType: 1 | 2 | 3 | 4,
    public readonly value: number
  ) {
    this.type = this.getCardType(cardType);
  }

  private getCardType(type: number): CardType {
    switch(type) {
      case 1:
        return CardType.DIAMONDS;
      case 2:
        return CardType.SPADES;
      case 3:
        return CardType.HEARTS;
      case 4:
        return CardType.CLUBS;
      default:
        throw new Error("Invalid card type");
    }
  }

  toggleFlip(): void {
    this.isFliped = !this.isFliped;
  }
}