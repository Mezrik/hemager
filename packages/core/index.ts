import 'reflect-metadata';
import { Container } from 'inversify';
import { infrastructureModule } from 'infrastructure/module';
import winston from 'winston';
import { TYPES } from 'infrastructure/types';
import { createLogger } from 'common/logger';
import { CommandHandler } from 'common/interfaces';

import { CreateCompetitionCommandHandler } from 'application/command/create-competition';

export const init = async () => {
  const container = new Container();

  await container.loadAsync(infrastructureModule);

  const logger = createLogger('hemager-application');

  container.bind<winston.Logger>(TYPES.Logger).toConstantValue(logger);

  container.bind<CommandHandler>(TYPES.CommandHandler).to(CreateCompetitionCommandHandler);

  return container;
};
