import {
  CommandBus as CommandBusInterface,
  Query,
  QueryBus as QueryBusInterface,
} from 'common/interfaces';
import { AsyncContainerModule, interfaces } from 'inversify';

import { TYPES } from './types';
import { CommandBus } from './command-bus';
import { QueryBus } from './query-bus';
import { database } from './db/inmemory/database';
import { CompetitionRepository as CompetitionRepositoryInterface } from 'domain/competition/competition-repository';
import { CompetitionRepository } from './db/inmemory/repositories/competition-repository';

export const infrastructureModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  bind<CompetitionRepositoryInterface>(TYPES.CompetitionRepository)
    .to(CompetitionRepository)
    .inSingletonScope();

  bind(TYPES.Db).toConstantValue(database);
  bind<CommandBusInterface>(TYPES.CommandBus).toConstantValue(new CommandBus());
  bind<QueryBusInterface<Query>>(TYPES.QueryBus).toConstantValue(new QueryBus());
});
