import {
  CommandBus as CommandBusInterface,
  Query,
  QueryBus as QueryBusInterface,
} from '@/common/interfaces';
import { AsyncContainerModule, interfaces } from 'inversify';

import { TYPES } from '../di-types.js';
import { CommandBus } from './command-bus/index.js';
import { QueryBus } from './query-bus/index.js';
import { database } from './db/inmemory/database.js';
import { CompetitionRepository as CompetitionRepositoryInterface } from '@/domain/competition/competition-repository';
import { CompetitionRepository } from './db/inmemory/repositories/competition-repository.js';

export const infrastructureModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  bind<CompetitionRepositoryInterface>(TYPES.CompetitionRepository)
    .to(CompetitionRepository)
    .inSingletonScope();

  bind(TYPES.Db).toConstantValue(database);
  bind<CommandBusInterface>(TYPES.CommandBus).toConstantValue(new CommandBus());
  bind<QueryBusInterface<Query>>(TYPES.QueryBus).toConstantValue(new QueryBus());
});
