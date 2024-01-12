import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({ selector: 'app-base', template: '' })
export class BaseComponent implements OnDestroy {
  public objectsForDestruction: Subscription[] = [];

  constructor() {}

  toDestroy(subscription: Subscription) {
    this.objectsForDestruction.push(subscription);
  }

  ngOnDestroy(): void {
    this.objectsForDestruction.forEach(object => object.unsubscribe());
  }
}
