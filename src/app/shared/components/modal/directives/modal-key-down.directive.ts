import {Directive, EventEmitter, HostListener, Output} from '@angular/core'

@Directive({
  selector: '[modalKeyDowns]',
  standalone: true,
})
export class ModalKeyDownDirective {
  @Output() escapeKeydown: EventEmitter<void> = new EventEmitter<void>()
  @Output() enterKeydown: EventEmitter<void> = new EventEmitter<void>()

  constructor() {}

  @HostListener('document:keydown.escape', ['$event'])
  public onEscapeKeydown(): void {
    this.escapeKeydown.emit()
  }

  @HostListener('document:keydown.enter', ['$event'])
  public onEnterKeydown(): void {
    this.enterKeydown.emit()
  }
}
