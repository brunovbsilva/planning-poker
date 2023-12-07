import { animate, state, style, transition, trigger } from "@angular/animations";

export const flipAnimation = [
  trigger('flipAnimation', [
    state('true', style({
      transform: 'rotateY(179deg)'
    })),
    state('false', style({
      transform: 'rotateY(0)'
    })),
    transition('true => false', animate('500ms ease-out')),
    transition('false => true', animate('500ms ease-in'))
  ])
]