import { Component, OnInit } from '@angular/core';
import { Card } from './card/interfaces/card.interface';
import { CardModel } from './card/models/card.model';
import { hoverAnimation } from './animations/hover.animation';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss'],
  animations: [ hoverAnimation ]
})
export class VotesComponent {

  public cards: Card[] = [
    new CardModel(1, 1),
    new CardModel(2, 2),
    new CardModel(3, 3),
    new CardModel(4, 5),
    new CardModel(1, 8),
    new CardModel(2, 13),
    new CardModel(3, 21),
    new CardModel(4, 34),
    new CardModel(1, 55),
    new CardModel(2, 89)
  ];
}
