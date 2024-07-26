import {Component, Input} from '@angular/core'
import {ICard} from '../../components/card/models/card.interface'

@Component({selector: 'app-card', template: ''})
export class CardComponentSpec {
  @Input() card!: ICard
  public isHovered = false
}
