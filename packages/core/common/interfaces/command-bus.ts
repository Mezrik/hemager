import { Command } from './command';
import { CommandHandler } from './command-handler';

export interface CommandBus<BaseCommand extends Command = Command> {
  registerHandler(handler: CommandHandler<BaseCommand>): any;
  send<T extends BaseCommand>(command: T): any;
}
