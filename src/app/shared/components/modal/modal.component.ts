import { Component, HostListener, Input, ViewChildren } from '@angular/core';
import { IModal } from './interfaces/modal.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { DestroyBase } from '../../helpers/destroy-base';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent extends DestroyBase implements IModal {
  @ViewChildren('button') buttons: HTMLElement[] = [];
  @Input() modalTitle: string = '';
  private isOpen: BehaviorSubject<boolean>;
  public isOpen$: Observable<boolean>;

  constructor() {
    super();
    this.isOpen = new BehaviorSubject<boolean>(false);
    this.isOpen$ = this.isOpen.asObservable();
    this.pushToDestroy(this.isOpen);
  }

  open(): void {
    this.isOpen.next(true);
  }
  
  close(): void {
    this.isOpen.next(false);
  }

}
