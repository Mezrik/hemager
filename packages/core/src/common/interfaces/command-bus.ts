import { Command } from './command.js';
import { CommandHandler } from './command-handler.js';

export interface CommandBus<BaseCommand extends Command = Command> {
  registerHandler(handler: CommandHandler<BaseCommand>): any;
  send<T extends BaseCommand>(command: T): any;
}
