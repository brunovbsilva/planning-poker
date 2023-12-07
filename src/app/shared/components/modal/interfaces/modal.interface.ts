export interface IModal {
  title: string;
  isOpen: boolean;

  open(): void;
  close(): void;
}