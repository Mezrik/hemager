import { ContainerModule, interfaces } from 'inversify';

import {
  CommandBus as CommandBusInterface,
  Query,
  QueryBus as QueryBusInterface,
} from '@/common/interfaces';
import { TransactionManager } from '@/common/interfaces/transaction-manager.js';
import { ContestRepository as ContestRepositoryInterface } from '@/domain/contest/contest-repository.js';
import { ContestantRepository as ContestantRepositoryInterface } from '@/domain/contestant/contestant-repository.js';
import { GroupRepository as GroupRepositoryInterface } from '@/domain/group/group-repository.js';
import { MatchRepository as MatchRepositoryInterface } from '@/domain/match/match-repository.js';
import { RoundRepository as RoundRepositoryInterface } from '@/domain/round/round-repository.js';
import { ContestRepository } from '@/infrastructure/db/inmemory/repositories/contest-repository';
import { RoundRepository } from '@/infrastructure/db/inmemory/repositories/round-repository.js';

import { TYPES } from '../di-types.js';

import { CommandBus } from './command-bus/index.js';
import { database } from './db/inmemory/database.js';
import { ContestantRepository } from './db/inmemory/repositories/contestant-repository.js';
import { GroupRepository } from './db/inmemory/repositories/group-repository.js';
import { MatchRepository } from './db/inmemory/repositories/match-repository.js';
import { SequelizeTransactionManager } from './db/inmemory/transaction-manager.js';
import { QueryBus } from './query-bus/index.js';

export const infrastructureModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(TYPES.Db).toConstantValue(database);
  bind<TransactionManager>(TYPES.TransactionManager).to(SequelizeTransactionManager);

  bind<ContestRepositoryInterface>(TYPES.ContestRepository)
    .to(ContestRepository)
    .inSingletonScope();

  bind<RoundRepositoryInterface>(TYPES.RoundRepository).to(RoundRepository).inSingletonScope();

  bind<ContestantRepositoryInterface>(TYPES.ContestantRepository)
    .to(ContestantRepository)
    .inSingletonScope();

  bind<GroupRepositoryInterface>(TYPES.GroupRepository).to(GroupRepository).inSingletonScope();

  bind<MatchRepositoryInterface>(TYPES.MatchRepository).to(MatchRepository).inSingletonScope();

  bind<CommandBusInterface>(TYPES.CommandBus).toConstantValue(new CommandBus());
  bind<QueryBusInterface<Query>>(TYPES.QueryBus).toConstantValue(new QueryBus());
});
