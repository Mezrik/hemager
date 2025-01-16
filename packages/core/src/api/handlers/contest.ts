import {
  CreateContestInput,
  UpdateContestInput,
  ContestDto,
  CategoryDto,
  WeaponDto,
} from '@hemager/api-types';

import { CreateContestCommand } from '@/application/command/contest/create-contest';
import { UpdateContestCommand } from '@/application/command/contest/update-contest';
import { GetAllCategoriesQuery } from '@/application/query/constest/get-all-categories';
import { GetAllContestsQuery } from '@/application/query/constest/get-all-contests';
import { GetAllWeaponsQuery } from '@/application/query/constest/get-all-weapons';
import { GetContestQuery } from '@/application/query/constest/get-contest';
import { CommandBus, QueryBus } from '@/common/interfaces';

export const contestHandlers = (_queryBus: QueryBus, _commandBus: CommandBus) => {
  return {
    create: async function (payload: CreateContestInput): Promise<void> {
      await _commandBus.send(
        new CreateContestCommand(
          payload.name,
          payload.date,
          payload.organizerName,
          payload.federationName,
          payload.contestType,
          payload.gender,
          payload.weaponId,
          payload.categoryId,
        ),
      );
    },
    update: async function (payload: UpdateContestInput): Promise<void> {
      await _commandBus.send(
        new UpdateContestCommand(
          payload.id,
          payload.name,
          payload.organizerName,
          payload.federationName,
          payload.contestType,
          payload.gender,
          payload.date,
          payload.weaponId,
          payload.categoryId,

          payload.expectedParticipants,
          payload.deploymentCriteria,
          payload.groupHits,
          payload.eliminationHits,
        ),
      );
    },
    getAll: function () {
      return _queryBus.execute<GetAllContestsQuery, ContestDto[]>(new GetAllContestsQuery());
    },

    getAllCategories: function () {
      return _queryBus.execute<GetAllCategoriesQuery, CategoryDto[]>(new GetAllCategoriesQuery());
    },

    getAllWeapons: function () {
      return _queryBus.execute<GetAllWeaponsQuery, WeaponDto[]>(new GetAllContestsQuery());
    },

    getOne(id: string) {
      return _queryBus.execute<GetContestQuery, ContestDto>(new GetContestQuery(id));
    },
  };
};
