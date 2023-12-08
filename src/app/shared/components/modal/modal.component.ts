import { Component, Input, ViewChildren } from '@angular/core';
import { IModal } from './interfaces/modal.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements IModal {
  @ViewChildren('button') buttons: HTMLElement[] = [];
  @Input() modalTitle: string = '';
  isOpen: boolean = false;

  open(): void {
    this.isOpen = true;
  }
  close(): void {
    this.isOpen = false;
  }

}
