import 'reflect-metadata';
import { Container } from 'inversify';
import { infrastructureModule } from 'infrastructure/module';
import winston from 'winston';
import { TYPES } from 'infrastructure/types';
import { createLogger } from 'common/logger';
import {
  Command,
  CommandBus,
  CommandHandler,
  Query,
  QueryBus,
  QueryHandler,
} from 'common/interfaces';

import {
  CreateCompetitionCommand,
  CreateCompetitionCommandHandler,
} from 'application/command/create-competition';
import { CompetitionTypeEnum, GenderEnum } from 'domain/competition/competition';

export const init = async () => {
  const container = new Container();

  await container.loadAsync(infrastructureModule);

  const logger = createLogger('hemager-application');

  container.bind<winston.Logger>(TYPES.Logger).toConstantValue(logger);

  container.bind<CommandHandler>(TYPES.CommandHandler).to(CreateCompetitionCommandHandler);

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

export const createCompetitionHandler = async (container: Container) => {
  const bus = container.get<CommandBus>(TYPES.CommandBus);

  await bus.send(
    new CreateCompetitionCommand(
      'test',
      'test',
      'test',
      CompetitionTypeEnum.national,
      GenderEnum.female,
      new Date(),
    ),
  );
};
