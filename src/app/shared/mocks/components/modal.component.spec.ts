import { Component, Input, ViewChildren } from '@angular/core';

@Component({ selector: 'app-modal', template: '' })
export class ModalComponentSpec {
  @ViewChildren('button') buttons: HTMLElement[] = [];
  @Input() modalTitle: string = '';
  isOpen: boolean = false;
}
