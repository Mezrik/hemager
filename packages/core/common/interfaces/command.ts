import { Message } from './message';

export interface Command extends Message {
  guid: string;
}
