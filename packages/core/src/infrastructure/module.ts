import { ContainerModule, interfaces } from 'inversify';

import {
  CommandBus as CommandBusInterface,
  Query,
  QueryBus as QueryBusInterface,
} from '@/common/interfaces';
import { TransactionManager } from '@/common/interfaces/transaction-manager';
import { ContestRepository as ContestRepositoryInterface } from '@/domain/contest/contest-repository';
import { ClubRepository as ClubRepositoryInterface } from '@/domain/contestant/club-repository';
import { ContestantRepository as ContestantRepositoryInterface } from '@/domain/contestant/contestant-repository';
import { GroupRepository as GroupRepositoryInterface } from '@/domain/group/group-repository';
import { MatchRepository as MatchRepositoryInterface } from '@/domain/match/match-repository';
import { RoundRepository as RoundRepositoryInterface } from '@/domain/round/round-repository';
import { ContestRepository } from '@/infrastructure/db/inmemory/repositories/contest-repository';
import { RoundRepository } from '@/infrastructure/db/inmemory/repositories/round-repository';

import { TYPES } from '../di-types';

import { CommandBus } from './command-bus/index';
import { database } from './db/inmemory/database';
import { ClubRepository } from './db/inmemory/repositories/club-repository.js';
import { ContestantRepository } from './db/inmemory/repositories/contestant-repository';
import { GroupRepository } from './db/inmemory/repositories/group-repository';
import { MatchRepository } from './db/inmemory/repositories/match-repository';
import { SequelizeTransactionManager } from './db/inmemory/transaction-manager';
import { QueryBus } from './query-bus/index';

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

  bind<ClubRepositoryInterface>(TYPES.ClubRepository).to(ClubRepository).inSingletonScope();

  bind<CommandBusInterface>(TYPES.CommandBus).toConstantValue(new CommandBus());
  bind<QueryBusInterface<Query>>(TYPES.QueryBus).toConstantValue(new QueryBus());
});
