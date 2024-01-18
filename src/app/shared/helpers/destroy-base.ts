import { Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Component({ template: '' })
export abstract class DestroyBase implements OnDestroy {
  protected toDestroy: Subject<any>[] = [];

  ngOnDestroy(): void {
    this.toDestroy.forEach(sub$ => sub$.unsubscribe());
  }

  pushToDestroy(sub$: Subject<any>): void {
    this.toDestroy.push(sub$);
  }
}