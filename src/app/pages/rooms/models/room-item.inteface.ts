export interface IRoomItem {
  readonly id: string;
  readonly name: string;
  getPath(): string[];
}
