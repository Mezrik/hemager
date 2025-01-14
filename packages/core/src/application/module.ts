import { CommandHandler, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { AsyncContainerModule, interfaces } from 'inversify';
import { GetAllContestsQueryHandler } from './query/get-all-contests.ts';
import { CreateContestCommandHandler } from './command/create-contest.ts';

export const applicationModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  bind<QueryHandler>(TYPES.QueryHandler).to(GetAllContestsQueryHandler);

  bind<CommandHandler>(TYPES.CommandHandler).to(CreateContestCommandHandler);
});
