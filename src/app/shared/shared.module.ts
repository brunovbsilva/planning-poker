import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';
import { MainButtonDirective } from './directives/main-button/main-button.directive';
import { MainInputDirective } from './directives/main-input/main-input.directive';
import { ModalKeydownsDirective } from './components/modal/directives/modal-keydowns.directive';

@NgModule({
  declarations: [
    CardComponent,
    ModalComponent,
    MainButtonDirective,
    MainInputDirective,
    ModalKeydownsDirective
  ],
  exports: [
    CardComponent,
    ModalComponent,
    MainButtonDirective,
    MainInputDirective
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule {}
