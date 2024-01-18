import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[modalKeydowns]'
})
export class ModalKeydownsDirective {

  @Output() escapeKeydown: EventEmitter<void> = new EventEmitter<void>();
  @Output() enterKeydown: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  @HostListener("document:keydown.escape", ["$event"])
  public onEscapeKeydown(event: KeyboardEvent): void {
    this.escapeKeydown.emit();
  }

  @HostListener("document:keydown.enter", ["$event"])
  public onEnterKeydown(event: KeyboardEvent): void {
    this.enterKeydown.emit();
  }

}
