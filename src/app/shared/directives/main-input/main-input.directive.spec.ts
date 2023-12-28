import { TestBed, async } from '@angular/core/testing';
import { MainInputDirective } from './main-input.directive';
import { ElementRef } from '@angular/core';
import { MockElementRef } from '../../mocks/others/element-ref.mock';

describe('MainInputDirective', () => {
  let elementRef: ElementRef;
  let directive: MainInputDirective;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ElementRef, useClass: MockElementRef}
      ]
    }).compileComponents();

    elementRef = TestBed.inject(ElementRef);
    directive = new MainInputDirective(elementRef);
  }));
  
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set style', () => {
    const spy = spyOn(elementRef.nativeElement.classList, 'add');
    directive.ngOnInit();
    expect(spy).toHaveBeenCalledWith('main-input');
  });
});
