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
import { ContestRepository as ContestRepositoryInterface } from '@/domain/contest/contest-repository.js';
import { ContestRepository } from '@/infrastructure/db/inmemory/repositories/contest-repository';

export const infrastructureModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  bind<ContestRepositoryInterface>(TYPES.ContestRepository)
    .to(ContestRepository)
    .inSingletonScope();

  bind(TYPES.Db).toConstantValue(database);
  bind<CommandBusInterface>(TYPES.CommandBus).toConstantValue(new CommandBus());
  bind<QueryBusInterface<Query>>(TYPES.QueryBus).toConstantValue(new QueryBus());
});
