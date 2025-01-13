import { Message } from './message.js';

export interface Command extends Message {
  guid: string;
}
