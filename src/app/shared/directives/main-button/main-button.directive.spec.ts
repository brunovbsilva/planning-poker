import { ElementRef } from '@angular/core';
import { MainButtonDirective } from './main-button.directive';

describe('MainButtonDirective', () => {
  it('should create an instance', () => {
    const element = new ElementRef('button');
    const directive = new MainButtonDirective(element);
    expect(directive).toBeTruthy();
  });
});
