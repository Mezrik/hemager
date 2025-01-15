import { injectable } from 'inversify';

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

  public send<T extends BaseCommand>(command: T) {
    if (this.handlers.has(command.constructor.name)) {
      (this.handlers.get(command.constructor.name) as CommandHandler<BaseCommand>).handle(command);
    }
  }
}
