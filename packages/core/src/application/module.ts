import { CommandHandler, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { AsyncContainerModule, interfaces } from 'inversify';
import { GetAllCompetitionsQueryHandler } from './query/get-all-competitions';
import { CreateCompetitionCommandHandler } from './command/create-competition';

export const applicationModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  bind<QueryHandler>(TYPES.QueryHandler).to(GetAllCompetitionsQueryHandler);

  bind<CommandHandler>(TYPES.CommandHandler).to(CreateCompetitionCommandHandler);
});
