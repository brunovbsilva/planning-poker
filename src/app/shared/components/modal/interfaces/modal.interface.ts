import { Signal } from "@angular/core";

export interface IModal {
  modalTitle: string;
  isOpen$: Signal<boolean>;

  open(): void;
  close(): void;
}