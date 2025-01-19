import { ContestDto, APIError, GroupDto, MatchDto } from '@hemager/api-types';
import { Task } from 'true-myth';

import { GetAllGroupsQuery } from '@/application/query/groups/get-all-groups';
import { GetAllMatchesQuery } from '@/application/query/match/get-all-matches';
import { queryErrorToAPIError } from '@/common/errors';
import { CommandBus, QueryBus } from '@/common/interfaces';
import { instanceToPlain } from '@/common/utils/transformer';
import { GetMatchQuery } from '@/application/query/match/get-match';

export const matchHandlers = (_queryBus: QueryBus, _commandBus: CommandBus) => {
  return {
    getAll: function (groupId: string): Task<MatchDto[], APIError> {
      return new Task((resolve, reject) => {
        void _queryBus
          .execute<GetAllMatchesQuery, MatchDto[]>(new GetAllMatchesQuery(groupId))
          .match({
            Resolved: (contests) =>
              resolve(contests.map((contest) => instanceToPlain(contest) as MatchDto)),
            Rejected: (error) => reject(queryErrorToAPIError(error)),
          });
      });
    },
    getOne: function (id: string): Task<MatchDto, APIError> {
      return new Task((resolve, reject) => {
        void _queryBus.execute<GetMatchQuery, MatchDto>(new GetMatchQuery(id)).match({
          Resolved: (contest) => {
            return resolve(instanceToPlain(contest) as MatchDto);
          },
          Rejected: (error) => reject(queryErrorToAPIError(error)),
        });
      });
    },
  };
};
