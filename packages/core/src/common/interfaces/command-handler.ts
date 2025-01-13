import { Command } from './command.js';

export interface CommandHandler<TCommand extends Command = any> {
  commandToHandle: string;
  handle(command: TCommand): any;
}
