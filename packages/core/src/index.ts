import 'reflect-metadata';
import { Container } from 'inversify';
import { infrastructureModule } from '@/infrastructure/module';
import winston from 'winston';
import { TYPES } from '@/di-types';
import { createLogger } from '@/common/logger';
import {
  Command,
  CommandBus,
  CommandHandler,
  Query,
  QueryBus,
  QueryHandler,
} from '@/common/interfaces';

import { applicationModule } from './application/module';

export * from '@/api';

export const initialize = async () => {
  const container = new Container();

  await container.loadAsync(infrastructureModule);

  await container.loadAsync(applicationModule);

  const logger = createLogger('hemager-application');

  container.bind<winston.Logger>(TYPES.Logger).toConstantValue(logger);

  const commandBus = container.get<CommandBus>(TYPES.CommandBus);
  container
    .getAll<CommandHandler<Command>>(TYPES.CommandHandler)
    .forEach((handler: CommandHandler<Command>) => {
      commandBus.registerHandler(handler);
    });

  const queryBus = container.get<QueryBus>(TYPES.QueryBus);
  container
    .getAll<QueryHandler<Query>>(TYPES.QueryHandler)
    .forEach((handler: QueryHandler<Query>) => {
      queryBus.registerHandler(handler);
    });

  return container;
};
