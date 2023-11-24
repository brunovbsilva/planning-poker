import { Component, HostListener, Input } from '@angular/core';
import { CardType } from './models/card-type.enum';
import { flipAnimation } from './animations/flip.animation';
import { Card } from './interfaces/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: flipAnimation
})
export class CardComponent {

  @Input() card!: Card;
  public isHovered: boolean = false;

  public getCardType() {
    switch(this.card.type) {
      case CardType.HEARTS:
        return "\u2665";
      case CardType.DIAMONDS:
        return "\u2666";
      case CardType.SPADES:
        return "\u2660";
      case CardType.CLUBS:
        return "\u2663";
    }
  }

  public getCardValue() {
    switch(this.card.value) {
      case 1:
        return "A";
      case 11:
        return "J";
      case 12:
        return "Q";
      case 13:
        return "K";
      default:
        return this.card.value;
    }
  }

  public getClasses() {
    return {
      'card-front--red': [CardType.HEARTS,  CardType.DIAMONDS].includes(this.card.type),
      'card-front--black': [CardType.SPADES, CardType.CLUBS].includes(this.card.type),
    }
  }
  
  @HostListener('mouseenter', ['$event'])
  @HostListener('mouseleave', ['$event'])
  private changeIsHovered(event: MouseEvent){
    this.isHovered = event.type === 'mouseenter';
  }
}
