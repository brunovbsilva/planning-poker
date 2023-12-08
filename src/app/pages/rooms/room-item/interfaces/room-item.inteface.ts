export interface IRoomItem {
  readonly id: string;
  readonly name: string;
  delete(): void;
  join(): void;
}