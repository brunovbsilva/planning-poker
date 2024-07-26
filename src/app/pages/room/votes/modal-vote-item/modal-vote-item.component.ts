import { Component, input, model } from '@angular/core';
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
  public currentValue = model<string>();

  public emit(value: string): void {
    this.currentValue.set(value);
  }

  public getTheme(value: string) {
    return this.currentValue() === value;
  }
}
