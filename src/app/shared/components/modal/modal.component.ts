import {
  Component,
  Input,
  Signal,
  ViewChildren,
  WritableSignal,
  signal,
} from '@angular/core'
import { IModal } from './interfaces/modal.interface'
import { ModalKeyDownDirective } from './directives/modal-key-down.directive'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [ModalKeyDownDirective],
})
export class ModalComponent implements IModal {
  @ViewChildren('button') buttons: HTMLElement[] = []
  @Input() modalTitle = ''
  private isOpen: WritableSignal<boolean> = signal(false)
  public isOpen$: Signal<boolean>

  constructor() {
    this.isOpen$ = this.isOpen.asReadonly()
  }

  open(): void {
    this.isOpen.set(true)
  }

  close(): void {
    this.isOpen.set(false)
  }
}
