import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';
import { MainButtonDirective } from './directives/main-button/main-button.directive';
import { MainInputDirective } from './directives/main-input/main-input.directive';

@NgModule({
  declarations: [
    CardComponent,
    ModalComponent,
    MainButtonDirective,
    MainInputDirective
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
