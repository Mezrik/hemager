import { ContestDto, APIError, GroupDto } from '@hemager/api-types';
import { Task } from 'true-myth';

import { GetAllGroupsQuery } from '@/application/query/groups/get-all-groups';
import { GetGroupQuery } from '@/application/query/groups/get-group';
import { queryErrorToAPIError } from '@/common/errors';
import { CommandBus, QueryBus } from '@/common/interfaces';
import { instanceToPlain } from '@/common/utils/transformer';

export const groupHandlers = (_queryBus: QueryBus, _commandBus: CommandBus) => {
  return {
    getAll: function (roundId: string): Task<GroupDto[], APIError> {
      return new Task((resolve, reject) => {
        void _queryBus
          .execute<GetAllGroupsQuery, GroupDto[]>(new GetAllGroupsQuery(roundId))
          .match({
            Resolved: (contests) =>
              resolve(contests.map((contest) => instanceToPlain(contest) as GroupDto)),
            Rejected: (error) => reject(queryErrorToAPIError(error)),
          });
      });
    },
    getOne: function (id: string): Task<GroupDto, APIError> {
      return new Task((resolve, reject) => {
        void _queryBus.execute<GetGroupQuery, GroupDto>(new GetGroupQuery(id)).match({
          Resolved: (contest) => {
            console.log(instanceToPlain(contest) as ContestDto);
            return resolve(instanceToPlain(contest) as GroupDto);
          },
          Rejected: (error) => reject(queryErrorToAPIError(error)),
        });
      });
    },
  };
};
