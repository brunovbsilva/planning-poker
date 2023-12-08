import { animate, state, style, transition, trigger } from "@angular/animations";

export const hoverAnimation = [
    trigger('hover', [
        state('true', style({ transform: 'translateY(-20%)' })),
        state('false', style({ transform: 'translateY(0)' })),
        transition('true <=> false', animate('200ms ease-in-out'))
    ])
]