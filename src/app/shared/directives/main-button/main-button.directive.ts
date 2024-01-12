import { Directive, ElementRef, Input, OnInit } from '@angular/core';

export type Theme = 'primary' | 'accent' | 'warn' | 'error';

@Directive({
  selector: 'button[main-button]'
})
export class MainButtonDirective implements OnInit {

  @Input() theme: Theme = 'primary';

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    this.setStyle();
  }

  private setStyle(): void {
    this.element.nativeElement.classList.add('main-button');
    this.element.nativeElement.classList.add(`main-button--${this.theme}`);
  }
}
