import { Component, Input, Signal, ViewChildren, WritableSignal, signal } from '@angular/core';
import { IModal } from './interfaces/modal.interface';
import { ModalKeydownsDirective } from './directives/modal-keydowns.directive';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    standalone: true,
    imports: [ModalKeydownsDirective]
})
export class ModalComponent implements IModal {
  @ViewChildren('button') buttons: HTMLElement[] = [];
  @Input() modalTitle: string = '';
  private isOpen: WritableSignal<boolean> = signal(false);
  public isOpen$: Signal<boolean>;

  constructor() {
    this.isOpen$ = this.isOpen.asReadonly();
  }

  open(): void {
    this.isOpen.set(true);
  }
  
  close(): void {
    this.isOpen.set(false);
  }

}
