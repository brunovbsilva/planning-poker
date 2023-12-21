import { ElementRef } from '@angular/core';
import { MainButtonDirective, Theme } from './main-button.directive';
import { MockElementRef } from '../../mocks/element-ref.mock';
import { TestBed, async } from '@angular/core/testing';

describe('MainButtonDirective', () => {
  let elementRef: ElementRef;
  let directive: MainButtonDirective;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ElementRef, useClass: MockElementRef}
      ]
    }).compileComponents();

    elementRef = TestBed.inject(ElementRef);
    directive = new MainButtonDirective(elementRef);
  }));
  
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  ['primary', 'accent', 'warn', 'error'].forEach((theme) => {
    it('should set style', () => {
      directive.theme = theme as Theme;
      const spy = spyOn(elementRef.nativeElement.classList, 'add');
      directive.ngOnInit();
      expect(spy).toHaveBeenCalledWith(`main-button`);
      expect(spy).toHaveBeenCalledWith(`main-button--${theme}`);
    });
  });
});
