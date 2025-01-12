import { Command } from './command';

export interface CommandHandler<TCommand extends Command = any> {
  commandToHandle: string;
  handle(command: TCommand): any;
}
