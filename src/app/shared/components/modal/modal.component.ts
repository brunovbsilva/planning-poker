import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { IModal } from './interfaces/modal.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements IModal, OnInit {
  @ViewChildren('button') buttons: HTMLElement[] = [];
  @Input() modalTitle: string = '';
  isOpen: boolean = false;

  ngOnInit(): void {
    console.log(this.buttons);
  }

  open(): void {
    this.isOpen = true;
  }
  close(): void {
    this.isOpen = false;
  }

}
