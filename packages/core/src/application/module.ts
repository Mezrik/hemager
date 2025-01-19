import { ContainerModule, interfaces } from 'inversify';

import { CommandHandler, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';

import { CreateContestCommandHandler } from './command/contest/create-contest.ts';
import { UpdateContestCommandHandler } from './command/contest/update-contest.ts';
import { CreateContestantCommandHandler } from './command/contestant/create-contestant.ts';
import { UpdateContestantCommandHandler } from './command/contestant/update-contestant.ts';
import { GetAllCategoriesQueryHandler } from './query/constest/get-all-categories.ts';
import { GetAllContestsQueryHandler } from './query/constest/get-all-contests.ts';
import { GetAllWeaponsQueryHandler } from './query/constest/get-all-weapons.ts';
import { GetContestQueryHandler } from './query/constest/get-contest.ts';
import { GetAllContestantsQueryHandler } from './query/contestant/get-all-contestants.ts';
import { GetContestantQueryHandler } from './query/contestant/get-contestant.ts';

export const applicationModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<QueryHandler>(TYPES.QueryHandler).to(GetAllContestsQueryHandler);
  bind<QueryHandler>(TYPES.QueryHandler).to(GetAllWeaponsQueryHandler);
  bind<QueryHandler>(TYPES.QueryHandler).to(GetAllCategoriesQueryHandler);
  bind<QueryHandler>(TYPES.QueryHandler).to(GetContestQueryHandler);
  bind<QueryHandler>(TYPES.QueryHandler).to(GetAllContestantsQueryHandler);
  bind<QueryHandler>(TYPES.QueryHandler).to(GetContestantQueryHandler);

  bind<CommandHandler>(TYPES.CommandHandler).to(CreateContestCommandHandler);
  bind<CommandHandler>(TYPES.CommandHandler).to(UpdateContestCommandHandler);
  bind<CommandHandler>(TYPES.CommandHandler).to(CreateContestantCommandHandler);
  bind<CommandHandler>(TYPES.CommandHandler).to(UpdateContestantCommandHandler);
});
