import { Component, Input } from '@angular/core';
import { ICard } from '../../components/card/interfaces/card.interface';

@Component({ selector: 'app-card', template: '' })
export class CardComponentSpec {
  @Input() card!: ICard;
  public isHovered: boolean = false;
}
