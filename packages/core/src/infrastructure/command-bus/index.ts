import { injectable } from 'inversify';
import Task from 'true-myth/task';

import { CommandError, CommandErrorTypes, InternalError } from '@/common/errors';
import { Command, CommandBus as CommandBusInterface, CommandHandler } from '@/common/interfaces';

@injectable()
export class CommandBus<BaseCommand extends Command = Command>
  implements CommandBusInterface<BaseCommand>
{
  public handlers: Map<string, CommandHandler<BaseCommand>> = new Map();

  public registerHandler(handler: CommandHandler<BaseCommand>) {
    const targetCommand: string = handler.commandToHandle;
    if (this.handlers.has(targetCommand)) {
      return;
    }
    this.handlers.set(targetCommand, handler);
  }

  public send<T extends BaseCommand>(command: T): Task<void, CommandError> {
    return new Task((resolve, reject) => {
      if (this.handlers.has(command.constructor.name)) {
        const task = (
          this.handlers.get(command.constructor.name) as CommandHandler<BaseCommand>
        ).handle(command);

        void task.match({
          Resolved: resolve,
          Rejected: reject,
        });
      } else
        reject({
          cause: 'Command not found, check if registered.',
          type: CommandErrorTypes.COMMAND_NOT_BOUND,
        });
    });
  }
}
