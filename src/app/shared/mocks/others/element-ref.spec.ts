import { Injectable } from "@angular/core";

@Injectable()
export class MockElementRef {
  nativeElement = {
    classList: {
      add: () => {},
      remove: () => {},
    },
  };
}