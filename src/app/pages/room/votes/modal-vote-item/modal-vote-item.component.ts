import {Component, EventEmitter, Output, input} from '@angular/core';
import { MainButtonDirective } from '../../../../shared/directives/main-button/main-button.directive';

@Component({
    selector: 'app-modal-vote-item',
    templateUrl: './modal-vote-item.component.html',
    styleUrl: './modal-vote-item.component.scss',
    standalone: true,
    imports: [MainButtonDirective],
})
export class ModalVoteItemComponent {
  public label = input.required<string>();
  public currentValue: string = "";
  @Output() onChoose: EventEmitter<string> = new EventEmitter<string>();

  public emit(value: string): void {
    this.currentValue = value;
    this.onChoose.emit(value)
  }

  public getTheme(value: string) {
    return this.currentValue === value;
  }
}
