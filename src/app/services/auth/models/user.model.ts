import { IUser } from './user.interface';
import { Guid } from 'guid-typescript';

export class User implements IUser {
  readonly id: string;
  readonly name: string;
  readonly image: string;

  constructor(
    name: string | null | undefined,
    image: string | null | undefined = undefined,
    id: string | null | undefined = undefined
  ) {
    this.id = id ?? Guid.create().toString();
    this.name = name ?? 'Unknown name';
    this.image = image ?? '';
  }
}
