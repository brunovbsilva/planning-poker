import { Observable } from "rxjs";

export interface IModal {
  modalTitle: string;
  isOpen$: Observable<boolean>;

  open(): void;
  close(): void;
}