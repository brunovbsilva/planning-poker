import { Component, HostListener, Input } from '@angular/core';
import { flipAnimation } from './animations/flip.animation';
import { ICard } from './interfaces/card.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    animations: flipAnimation,
    standalone: true
})
export class CardComponent {

  @Input() card!: ICard;
  public isHovered: boolean = false;
  
  @HostListener('mouseenter', ['$event'])
  @HostListener('mouseleave', ['$event'])
  private changeIsHovered(event: MouseEvent){
    this.isHovered = event.type === 'mouseenter';
  }
}
