import { nanoid } from 'nanoid';

import { Command as CommandInterface } from './interfaces/command';

export abstract class Command implements CommandInterface {
  public guid: string;

  constructor(guid?: string) {
    this.guid = guid || nanoid();
  }
}
