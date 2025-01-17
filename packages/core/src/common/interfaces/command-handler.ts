import Task from 'true-myth/task';

import { CommandError } from '../errors';

import { Command } from './command';

export interface CommandHandler<TCommand extends Command = any> {
  commandToHandle: string;
  handle(command: TCommand): Task<void, CommandError>;
}
