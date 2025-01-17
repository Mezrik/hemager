import { Task } from 'true-myth';

import { CommandError } from '../errors.js';

import { CommandHandler } from './command-handler.js';
import { Command } from './command.js';

export interface CommandBus<BaseCommand extends Command = Command> {
  registerHandler(handler: CommandHandler<BaseCommand>): any;
  send<T extends BaseCommand>(command: T): Task<void, CommandError>;
}
