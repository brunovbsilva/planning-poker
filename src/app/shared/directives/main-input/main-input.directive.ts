import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[main-input]',
    standalone: true
})
export class MainInputDirective implements OnInit {

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    this.setStyle();
  }

  private setStyle(): void {
    this.element.nativeElement.classList.add('main-input');
  }

}
