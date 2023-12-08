export interface IModal {
  modalTitle: string;
  isOpen: boolean;

  open(): void;
  close(): void;
}